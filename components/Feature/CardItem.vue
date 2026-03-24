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
    class="cursor-pointer group flex flex-col items-center p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
  >
    <div class="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
      <UIcon :name="props.icon" class="w-8 h-8 text-blue-600" />
    </div>
    <h3 class="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
      {{ props.title }}
    </h3>
    <p class="mt-2 text-slate-500 text-center text-sm leading-relaxed">
      {{ props.description }}
    </p>
  </NuxtLink>
</template>
