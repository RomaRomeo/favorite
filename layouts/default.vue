<script setup lang="ts">
const color = useColorMode();
color.preference = 'light';
</script>
<template>
  <div class="min-h-screen flex flex-col bg-[#F8FAFC]">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
