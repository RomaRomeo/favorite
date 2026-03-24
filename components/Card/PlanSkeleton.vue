<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 4 });
</script>

<template>
  <div
    v-for="n in props.limit"
    :key="n"
    class="w-full min-h-[520px] px-6 py-4 border border-sky-200 transition-shadow duration-300 hover:shadow-lg transition-colors duration-300 transform rounded-lg bg-gray-50 flex flex-col relative"
  >
    <div class="space-y-4 animate-pulse flex flex-col flex-1">
      <div class="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
      <div
        class="h-12 bg-gray-300 rounded w-5/6 mx-auto"
      ></div>
      <div class="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
      <div class="h-6 bg-gray-300 rounded w-1/4 mx-auto"></div>
      <div class="space-y-4 flex-1">
        <div class="h-6 bg-gray-300 rounded w-full"></div>
        <div class="h-6 bg-gray-300 rounded w-full"></div>
        <div class="h-6 bg-gray-300 rounded w-full"></div>
        <div class="h-6 bg-gray-300 rounded w-full"></div>
        <div class="h-6 bg-gray-300 rounded w-full"></div>
      </div>
      <div
        class="h-10 bg-gray-300 rounded w-full mx-auto mt-auto"
      ></div>
    </div>
  </div>
</template>
