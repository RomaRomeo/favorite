<script setup lang="ts">
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 3 });
</script>

<template>
  <div>
    <div
      v-for="n in props.limit" :key="n" class="px-8 py-4 bg-white rounded-lg shadow-md mb-4"
    >
      <div class="flex items-center justify-between mb-4">
        <span class="w-32 h-4 bg-gray-300 rounded animate-pulse"></span>
        <div class="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div class="mt-2">
        <div class="w-48 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div class="mt-2 w-full h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div class="flex items-center justify-between mt-4">
        <div class="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
          <div class="ml-4 w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.75;
  }
  100% {
    opacity: 0.25;
  }
}
</style>
