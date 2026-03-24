<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`news-${route.path}`, () => queryCollection('news').path(route.path).first())

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Сторінку не знайдено' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description || `${post.value.title} — Фаворит ТВ/НЕТ`,
  ogTitle: post.value.title,
  ogDescription: post.value.description || `${post.value.title} — Фаворит ТВ/НЕТ`,
  ogImage: post.value.image || '/images/logo/logo-dark.png',
  ogType: 'article',
})
</script>

<template>
  <UContainer v-if="post">
    <div class="max-w-3xl mx-auto py-8">
      <NuxtLink to="/news" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mb-6 text-sm">
        <UIcon name="i-heroicons-arrow-left-20-solid" class="w-4 h-4" />
        Назад до оголошень
      </NuxtLink>

      <NuxtImg
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        class="w-full h-64 object-cover rounded-xl mb-6"
      />

      <div class="flex items-center gap-3 mb-4">
        <span class="text-sm text-gray-500">{{ post.date }}</span>
        <span v-if="post.category" class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {{ post.category }}
        </span>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ post.title }}</h1>

      <div class="prose prose-lg max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </UContainer>
</template>
