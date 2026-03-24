<script setup lang="ts">
const props = defineProps<{
  image: string;
  title: string;
  description: string;
  category: string;
  author?: {
    name: string;
    avatar: string;
  };
  date: string;
}>();
const emit = defineEmits(["onCardClick"]);
</script>

<template>
  <button
    class="group w-full text-left bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
    @click="emit('onCardClick')"
  >
    <div class="relative overflow-hidden">
      <img
        class="object-cover w-full h-52 transition-transform duration-300 group-hover:scale-105"
        :src="props.image"
        :alt="props.title"
      />
      <span class="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
        {{ props.category }}
      </span>
    </div>

    <div class="p-5">
      <h3 class="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
        {{ props.title }}
      </h3>
      <p class="mt-2 text-sm text-slate-500 line-clamp-2">
        {{ props.description }}
      </p>
      <div class="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:gap-2.5 transition-all duration-200">
        <span>Відкрити інструкцію</span>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
      </div>
    </div>
  </button>
</template>
