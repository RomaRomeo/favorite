<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  link?: string;
  description: string;
}>()
</script>

<template>
  <NuxtLink
    :to="props.link"
    class="group relative flex cursor-pointer flex-col items-center rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08),0_4px_8px_-4px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200/80 hover:shadow-[0_12px_40px_-16px_rgba(15,23,42,0.14),0_8px_24px_-8px_rgba(37,99,235,0.12)] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
  >
    <div
      class="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100/90"
    >
      <UIcon :name="props.icon" class="h-8 w-8 text-blue-600" />
    </div>
    <h3 class="text-center text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
      {{ props.title }}
    </h3>
    <p class="mt-2 text-center text-sm leading-relaxed text-slate-500">
      {{ props.description }}
    </p>
    <div class="mt-4 flex justify-center" aria-hidden="true">
      <UIcon
        name="i-heroicons-chevron-right-20-solid"
        class="h-5 w-5 text-blue-500/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
      />
    </div>
  </NuxtLink>
</template>
