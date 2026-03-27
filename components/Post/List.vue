<script setup lang="ts">
import { postCategoryBadgeClass } from '~/utils/postCategoryBadgeClass';

const props = withDefaults(defineProps<{
  posts?: any[] | null;
  emptyText?: string;
  linkText?: string;
}>(), {
  posts: null,
})
</script>

<template>
  <div v-if="posts?.length" class="grid gap-5">
    <NuxtLink
      v-for="post in posts"
      :key="post.path"
      :to="post.path"
      class="group block bg-white border border-slate-200 rounded-2xl shadow-sm p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-medium text-slate-400 tracking-wide uppercase">{{ post.date }}</span>
        <span
          v-if="post.category"
          class="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
          :class="postCategoryBadgeClass(post.category, 'plain')"
        >
          {{ post.category }}
        </span>
      </div>

      <h3 class="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-200">
        {{ post.title }}
      </h3>

      <div class="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:gap-2.5 transition-all duration-200">
        <span>{{ linkText || 'Читати далі' }}</span>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
      </div>
    </NuxtLink>
  </div>

  <div v-else class="text-center py-16 text-slate-400">
    {{ emptyText || 'Записів ще немає' }}
  </div>
</template>
