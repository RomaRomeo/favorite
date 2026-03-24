<script setup lang="ts">
const props = defineProps<{
  title: string;
  date: string;
  category?: string;
  path: string;
  image?: string;
}>()
</script>

<template>
  <NuxtLink
    :to="props.path"
    class="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
  >
    <NuxtImg
      v-if="props.image"
      :src="props.image"
      :alt="props.title"
      class="w-full h-48 object-cover"
      loading="lazy"
    />
    <div class="p-5">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm text-gray-500">{{ props.date }}</span>
        <span
          v-if="props.category"
          class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
        >
          {{ props.category }}
        </span>
      </div>
      <h3 class="font-semibold text-gray-800">{{ props.title }}</h3>
    </div>
  </NuxtLink>
</template>
