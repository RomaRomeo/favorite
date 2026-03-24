<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const isPanelOpen = ref(false);
const headerElRef = ref(null);

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value;
}

const onClose = () => isPanelOpen.value = false;

onClickOutside(headerElRef, () => onClose());

const route = useRoute();
watch(() => route.fullPath, () => onClose());
</script>

<template>
  <header ref="headerElRef" class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
    <div class="container mx-auto flex justify-between items-center px-4 h-16">
      <div class="flex items-center">
        <slot name="logo" />
      </div>

      <nav class="hidden lg:flex items-center gap-1">
        <slot name="center" />
      </nav>

      <div class="lg:hidden">
        <UButton
          :icon="isPanelOpen ? 'line-md:menu-to-close-transition' : 'line-md:menu'"
          color="neutral"
          variant="ghost"
          size="md"
          @click="togglePanel"
        />
      </div>

      <div class="hidden lg:flex items-center">
        <slot name="right" />
      </div>
    </div>

    <!-- Mobile overlay -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isPanelOpen"
        class="fixed inset-0 top-16 bg-black/40 z-30 lg:hidden"
        @click="onClose"
      />
    </transition>

    <!-- Mobile panel -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        v-if="isPanelOpen"
        class="absolute top-full left-0 w-full bg-white shadow-xl border-b border-slate-200 z-40 lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto"
      >
        <div class="container mx-auto px-4 py-4">
          <slot name="panel" />
        </div>
      </div>
    </transition>
  </header>
</template>
