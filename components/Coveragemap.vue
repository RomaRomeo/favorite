<script setup lang="ts">
interface Town { name: string; lat: number; lng: number; hub?: boolean }

const props = defineProps<{ towns: Town[]; selected: string }>()
const emit = defineEmits<{ 'update:selected': [value: string] }>()

const reduced = ref(false)
onMounted(() => {
    reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const VB_W = 1440, VB_H = 460, PAD = 90, PAD_Y = 40

const scene = computed(() => {
    const valid = props.towns.filter(t => typeof t.lat === 'number' && typeof t.lng === 'number')
    if (!valid.length) return null

    const latMean = (Math.max(...valid.map(t => t.lat)) + Math.min(...valid.map(t => t.lat))) / 2
    const kx = Math.cos((latMean * Math.PI) / 180)
    const raw = valid.map(t => ({ ...t, rx: t.lng * kx, ry: -t.lat }))

    let best = 0, ax = 0
    for (let i = 0; i < raw.length; i++)
        for (let j = i + 1; j < raw.length; j++) {
            const dx = raw[i]!.rx - raw[j]!.rx, dy = raw[i]!.ry - raw[j]!.ry, d = dx * dx + dy * dy
            if (d > best) { best = d; ax = Math.atan2(dy, dx) }
        }
    const cxr = raw.reduce((a, t) => a + t.rx, 0) / raw.length
    const cyr = raw.reduce((a, t) => a + t.ry, 0) / raw.length
    const cA = Math.cos(-ax), sA = Math.sin(-ax)
    const rot = raw.map(t => {
        const dx = t.rx - cxr, dy = t.ry - cyr
        return { ...t, px: dx * cA - dy * sA, py: dx * sA + dy * cA }
    })

    const pxs = rot.map(t => t.px), pys = rot.map(t => t.py)
    const xMin = Math.min(...pxs), xMax = Math.max(...pxs)
    const yMin = Math.min(...pys), yMax = Math.max(...pys)
    const sx = (VB_W - 2 * PAD) / ((xMax - xMin) || 1)
    const sy = (VB_H - 2 * PAD_Y) / ((yMax - yMin) || 1)
    const offX = PAD
    const offY = (VB_H - (yMax - yMin) * sy) / 2

    const points = rot.map(t => ({ ...t, x: offX + (t.px - xMin) * sx, y: offY + (t.py - yMin) * sy }))
    const hub = points.find(p => p.hub) ?? points[0]!
    const cx = points.reduce((a, p) => a + p.x, 0) / points.length
    const cy = points.reduce((a, p) => a + p.y, 0) / points.length

    const sorted = points.slice().sort((a, b) => a.x - b.x || a.y - b.y)
    const cr = (o: any, a: any, b: any) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
    const lo: any[] = []
    for (const q of sorted) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q) }
    const up: any[] = []
    for (let i = sorted.length - 1; i >= 0; i--) { const q = sorted[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q) }
    lo.pop(); up.pop()
    const hullPts = lo.concat(up).map(p => {
        const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1
        return `${(p.x + (dx / d) * 40).toFixed(1)},${(p.y + (dy / d) * 40).toFixed(1)}`
    })
    const hullPath = hullPts.length ? `M${hullPts.join(' L')} Z` : ''

    const gridX = Array.from({ length: Math.floor(VB_W / 80) + 1 }, (_, i) => i * 80)
    const gridY = Array.from({ length: Math.floor(VB_H / 80) + 1 }, (_, i) => i * 80)

    return { points, hub, hullPath, gridX, gridY }
})

function pick(name: string) { emit('update:selected', name) }
</script>

<template>
    <svg v-if="scene" :viewBox="`0 0 ${VB_W} ${VB_H}`" class="block h-auto w-full" role="img"
        aria-label="Карта оптичної мережі покриття">
        <line v-for="x in scene.gridX" :key="`gx-${x}`" :x1="x" y1="0" :x2="x" :y2="VB_H" stroke="#0b1220"
            stroke-opacity="0.035" stroke-width="1" />
        <line v-for="y in scene.gridY" :key="`gy-${y}`" x1="0" :y1="y" :x2="VB_W" :y2="y" stroke="#0b1220"
            stroke-opacity="0.035" stroke-width="1" />

        <line v-for="t in scene.points.filter(p => !p.hub)" :key="`l-${t.name}`" :x1="scene.hub.x" :y1="scene.hub.y"
            :x2="t.x" :y2="t.y" stroke="#3b82f6" stroke-width="1" stroke-opacity="0.32" />

        <template v-if="!reduced">
            <circle v-for="(t, i) in scene.points.filter(p => !p.hub)" :key="`p-${t.name}`" r="2.6" fill="#2563eb">
                <animateMotion :dur="`${(5.2 + (i % 5) * 0.4).toFixed(2)}s`" repeatCount="indefinite"
                    :path="`M${scene.hub.x},${scene.hub.y} L${t.x},${t.y}`" />
            </circle>
        </template>

        <g v-for="t in scene.points" :key="`t-${t.name}`"
            class="cursor-pointer [&_.lbl]:opacity-0 hover:[&_.lbl]:opacity-100"
            :class="{ '[&_.lbl]:opacity-100': t.name === selected }" @click="pick(t.name)">
            <title>{{ t.name }}</title>
            <template v-if="t.hub">
                <circle :cx="t.x" :cy="t.y" r="15" fill="#2563eb" fill-opacity="0.14" />
                <circle :cx="t.x" :cy="t.y" r="6.5" fill="#2563eb" stroke="#fff" stroke-width="2.5" />
                <text :x="t.x" :y="t.y - 14" text-anchor="middle"
                    style="font:700 16px Inter,sans-serif;fill:#0f2f5c;paint-order:stroke;stroke:#f8fafc;stroke-width:3.5px">{{
                        t.name }}</text>
            </template>
            <template v-else>
                <circle :cx="t.x" :cy="t.y" r="4.5" fill="#fff" stroke="#2563eb" stroke-width="2" />
                <text class="lbl" :x="t.x" :y="t.y - 11" text-anchor="middle"
                    style="font:600 15px Inter,sans-serif;fill:#334155;paint-order:stroke;stroke:#f8fafc;stroke-width:3px;transition:opacity .15s">{{
                        t.name }}</text>
            </template>
        </g>

        <circle v-for="t in scene.points.filter(p => p.name === selected)" :key="`sel-${t.name}`" :cx="t.x" :cy="t.y"
            r="5" fill="none" stroke="#2563eb" stroke-width="2.5">
            <template v-if="!reduced">
                <animate attributeName="r" values="5;20;5" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur="1.6s" repeatCount="indefinite" />
            </template>
        </circle>
    </svg>
</template>
