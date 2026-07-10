<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const el = ref(null)

let animId = null
let ro = null
let io = null
let visHandler = null
let isPaused = false
let nodeBreath = 1  // subtle breathing factor for the light node (1 = neutral)
let breathPhase = 0
let W = 0
let H = 0
let NX = 0  // light-node x
let NY = 0  // light-node y
let fibers = []
let pulses = []

// Incoming fibers: dim, subordinate to text zone
const IN_STROKES = [
  'rgba(56,189,248,0.18)',
  'rgba(125,211,252,0.13)',
  'rgba(14,165,233,0.16)',
  'rgba(99,210,255,0.12)',
]
// Outgoing rays: brighter, the burst after the node
const OUT_STROKES = [
  'rgba(56,189,248,0.42)',
  'rgba(125,211,252,0.34)',
  'rgba(14,165,233,0.38)',
]
const RGBS = [
  '56,189,248',
  '125,211,252',
  '14,165,233',
  '99,210,255',
  '147,223,255',
]

function buildScene(w, h) {
  // On narrow viewports (mobile) shift node right + up so it stays outside text block
  const mobile = w < 900
  NX = w * (mobile ? 0.80 : 0.72)
  NY = h * (mobile ? 0.36 : 0.45)

  // 6 incoming fibers: left edge → node, fanning in from different heights
  const inDefs = [
    { sx: 0, sy: h * 0.06, c0x: w * 0.24, c0y: h * 0.10, c1x: w * 0.52, c1y: NY - h * 0.20 },
    { sx: 0, sy: h * 0.20, c0x: w * 0.21, c0y: h * 0.23, c1x: w * 0.50, c1y: NY - h * 0.11 },
    { sx: 0, sy: h * 0.36, c0x: w * 0.19, c0y: h * 0.36, c1x: w * 0.49, c1y: NY - h * 0.03 },
    { sx: 0, sy: h * 0.54, c0x: w * 0.19, c0y: h * 0.53, c1x: w * 0.49, c1y: NY + h * 0.06 },
    { sx: 0, sy: h * 0.70, c0x: w * 0.22, c0y: h * 0.66, c1x: w * 0.51, c1y: NY + h * 0.14 },
    { sx: 0, sy: h * 0.88, c0x: w * 0.26, c0y: h * 0.80, c1x: w * 0.53, c1y: NY + h * 0.25 },
  ]

  // 3 outgoing rays: node → right edge, fanning out
  const outDefs = [
    { c0x: NX + w * 0.06, c0y: NY - h * 0.10, c1x: w * 0.89, c1y: h * 0.20, ex: w, ey: h * 0.12 },
    { c0x: NX + w * 0.07, c0y: NY - h * 0.01, c1x: w * 0.91, c1y: NY - h * 0.02, ex: w, ey: NY },
    { c0x: NX + w * 0.06, c0y: NY + h * 0.10, c1x: w * 0.89, c1y: h * 0.70, ex: w, ey: h * 0.76 },
  ]

  const inFibers = inDefs.map((d, i) => ({
    pts: [d.sx, d.sy, d.c0x, d.c0y, d.c1x, d.c1y, NX, NY],
    stroke: IN_STROKES[i % IN_STROKES.length],
    lw: 0.40 + (i % 3) * 0.16,
    isOut: false,
  }))

  const outFibers = outDefs.map((d, i) => ({
    pts: [NX, NY, d.c0x, d.c0y, d.c1x, d.c1y, d.ex, d.ey],
    stroke: OUT_STROKES[i % OUT_STROKES.length],
    lw: 0.90 + i * 0.18,
    isOut: true,
  }))

  fibers = [...inFibers, ...outFibers]

  const nIn = inDefs.length
  pulses = fibers.flatMap((f, fi) => {
    const isOut = fi >= nIn
    const n = isOut ? 2 : (fi % 2 === 0 ? 2 : 1)
    return Array.from({ length: n }, (_, j) => ({
      fi,
      t: ((fi * 3 + j * 5) % 11) / 11,
      speed: 0.0006 + ((fi * 5 + j * 3) % 9) * 0.00007,
      rgb: RGBS[(fi + j) % RGBS.length],
      // Outgoing ray pulses are larger and brighter
      r: isOut ? 3.8 + j * 0.9 : 2.4 + ((fi + j) % 4) * 0.55,
      isOut,
    }))
  })
}

function bez(t, a, b, c, d) {
  const u = 1 - t
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
}

function ptAt(f, t) {
  const [x0, y0, cx0, cy0, cx1, cy1, x1, y1] = f.pts
  return [bez(t, x0, cx0, cx1, x1), bez(t, y0, cy0, cy1, y1)]
}

function renderNodeGlow(ctx) {
  const base = Math.min(W, H)

  // Wide outer corona — sets the mood
  const g0 = ctx.createRadialGradient(NX, NY, 0, NX, NY, base * 0.28)
  g0.addColorStop(0, 'rgba(56,189,248,0.16)')
  g0.addColorStop(0.45, 'rgba(56,189,248,0.06)')
  g0.addColorStop(1, 'rgba(14,165,233,0)')
  ctx.beginPath()
  ctx.arc(NX, NY, base * 0.28, 0, Math.PI * 2)
  ctx.fillStyle = g0
  ctx.fill()

  // Medium glow — breathes gently
  const rMed = base * 0.10 * nodeBreath
  const g1 = ctx.createRadialGradient(NX, NY, 0, NX, NY, rMed)
  g1.addColorStop(0, `rgba(147,223,255,${(0.72 * nodeBreath).toFixed(3)})`)
  g1.addColorStop(0.40, 'rgba(56,189,248,0.28)')
  g1.addColorStop(1, 'rgba(14,165,233,0)')
  ctx.beginPath()
  ctx.arc(NX, NY, rMed, 0, Math.PI * 2)
  ctx.fillStyle = g1
  ctx.fill()

  // White-hot core — breathes gently
  const rCore = base * 0.030 * nodeBreath
  const g2 = ctx.createRadialGradient(NX, NY, 0, NX, NY, rCore)
  g2.addColorStop(0, `rgba(255,255,255,${(0.94 * nodeBreath).toFixed(3)})`)
  g2.addColorStop(0.45, 'rgba(147,223,255,0.72)')
  g2.addColorStop(1, 'rgba(56,189,248,0)')
  ctx.beginPath()
  ctx.arc(NX, NY, rCore, 0, Math.PI * 2)
  ctx.fillStyle = g2
  ctx.fill()
}

function render(ctx, reduced) {
  ctx.clearRect(0, 0, W, H)

  for (const f of fibers) {
    const [x0, y0, cx0, cy0, cx1, cy1, x1, y1] = f.pts
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.bezierCurveTo(cx0, cy0, cx1, cy1, x1, y1)

    ctx.shadowColor = f.stroke
    ctx.shadowBlur = f.isOut ? 12 : 4
    ctx.strokeStyle = f.stroke
    ctx.lineWidth = f.lw + (f.isOut ? 1.4 : 0.6)
    ctx.stroke()

    ctx.shadowBlur = 0
    ctx.strokeStyle = f.stroke.replace(/[\d.]+\)$/, f.isOut ? '0.60)' : '0.32)')
    ctx.lineWidth = f.lw * (f.isOut ? 0.60 : 0.36)
    ctx.stroke()
  }
  ctx.shadowBlur = 0

  // Node glow is drawn even in reduced-motion (it's static)
  if (NX > 0) renderNodeGlow(ctx)

  if (reduced) return

  for (const p of pulses) {
    const f = fibers[p.fi]
    if (!f) continue
    const [px, py] = ptAt(f, p.t)

    // Incoming fibers: fade in past text zone (28 % → 46 % of width)
    // Outgoing rays: always fully bright (they start at the node, ≥72 %)
    const xAlpha = p.isOut
      ? 1
      : (W > 0 ? Math.min(1, Math.max(0, (px / W - 0.28) / 0.18)) : 1)
    if (xAlpha < 0.02) continue

    const r = p.r

    const g = ctx.createRadialGradient(px, py, 0, px, py, r * 5)
    g.addColorStop(0, `rgba(${p.rgb},${(0.85 * xAlpha).toFixed(2)})`)
    g.addColorStop(0.25, `rgba(${p.rgb},${(0.46 * xAlpha).toFixed(2)})`)
    g.addColorStop(0.65, `rgba(${p.rgb},${(0.08 * xAlpha).toFixed(2)})`)
    g.addColorStop(1, `rgba(${p.rgb},0)`)
    ctx.beginPath()
    ctx.arc(px, py, r * 5, 0, Math.PI * 2)
    ctx.fillStyle = g
    ctx.fill()

    const g2 = ctx.createRadialGradient(px, py, 0, px, py, r * 1.9)
    g2.addColorStop(0, `rgba(${p.rgb},${Math.min(1, xAlpha).toFixed(2)})`)
    g2.addColorStop(1, `rgba(${p.rgb},0)`)
    ctx.beginPath()
    ctx.arc(px, py, r * 1.9, 0, Math.PI * 2)
    ctx.fillStyle = g2
    ctx.fill()

    ctx.beginPath()
    ctx.arc(px, py, r * 0.55, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${(0.92 * xAlpha).toFixed(2)})`
    ctx.fill()
  }
}

function loop(ctx, reduced) {
  if (!isPaused) {
    breathPhase += 0.018
    nodeBreath = 1 + 0.10 * Math.sin(breathPhase)  // ±10% gentle pulse
    for (const p of pulses) {
      p.t += p.speed
      if (p.t > 1) p.t -= 1
    }
  }
  render(ctx, reduced)
  animId = requestAnimationFrame(() => loop(ctx, reduced))
}

onMounted(() => {
  const canvas = el.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = window.devicePixelRatio || 1

  function sync() {
    const section = canvas.closest('section')
    if (!section) return
    W = section.offsetWidth
    H = section.offsetHeight
    if (!W || !H) return
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    buildScene(W, H)
    if (reduced) render(ctx, true)
  }

  sync()

  ro = new ResizeObserver(sync)
  const section = canvas.closest('section')
  if (section) ro.observe(section)

  visHandler = () => { isPaused = document.hidden }
  document.addEventListener('visibilitychange', visHandler)

  io = new IntersectionObserver(([e]) => {
    isPaused = !(e && e.isIntersecting) || document.hidden
  }, { threshold: 0.01 })
  io.observe(canvas)

  if (!reduced) loop(ctx, false)
})

onUnmounted(() => {
  if (animId !== null) cancelAnimationFrame(animId)
  if (ro) ro.disconnect()
  if (io) io.disconnect()
  if (visHandler) document.removeEventListener('visibilitychange', visHandler)
})
</script>

<template>
  <canvas ref="el" class="absolute inset-0 pointer-events-none" style="z-index: 1;" aria-hidden="true" />
</template>
