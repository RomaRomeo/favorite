<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  description?: string
  details: string[]
  icon: string
  isLink?: boolean
}>()

const makeLink = (value: string) => {
  if (value.includes('@')) return `mailto:${value}`
  if (value.match(/^\+?[0-9\s\-()]+$/)) return `tel:${value.replace(/\s/g, '')}`
  return '#'
}
</script>

<template>
  <div class="bg-white border border-slate-200 rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <UIcon :name="icon" class="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h3 class="text-sm font-bold text-slate-900">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-slate-500">{{ subtitle }}</p>
      </div>
    </div>
    <div class="space-y-1.5 pl-[52px]">
      <p
        v-if="description"
        class="text-xs text-slate-400 leading-relaxed"
        v-html="description"
      />
      <div v-for="(text, index) in details" :key="index">
        <a
          v-if="isLink"
          :href="makeLink(text)"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          {{ text }}
          <UIcon name="i-heroicons-arrow-top-right-on-square-20-solid" class="w-3.5 h-3.5" />
        </a>
        <p v-else class="text-sm text-slate-700">{{ text }}</p>
      </div>
    </div>
  </div>
</template>
