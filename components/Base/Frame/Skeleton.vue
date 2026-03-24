<template>
  <div class="absolute inset-0 w-full h-full bg-gray-300 rounded-lg shadow-md animate-pulse" />
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
