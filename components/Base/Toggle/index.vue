<script setup lang="ts">
defineProps<{
  options: string[];
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex justify-center">
    <div class="inline-flex items-center gap-0.5 p-1 bg-slate-100 border border-slate-200 rounded-full">
      <button
        v-for="option in options"
        :key="option"
        @click="emit('update:modelValue', option)"
        class="relative px-6 py-2 text-sm font-semibold capitalize rounded-full transition-all duration-200 outline-none ring-0 focus:outline-none focus:ring-0"
        :class="modelValue === option
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
