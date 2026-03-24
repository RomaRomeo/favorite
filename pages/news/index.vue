<script setup lang="ts">
useSeoMeta({
  title: 'Оголошення',
  description: 'Останні новини та оголошення від Фаворит ТВ/НЕТ. Оновлення тарифів, нові послуги та важлива інформація для абонентів.',
  ogTitle: 'Оголошення | Фаворит ТВ/НЕТ',
  ogDescription: 'Останні новини та оголошення від інтернет-провайдера Фаворит.',
  ogImage: '/images/logo/logo-dark.png',
})

const { data: posts } = await useAsyncData('news', () => queryCollection('news').order('date', 'DESC').all())
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <h2 class="text-3xl font-semibold text-slate-900 mb-4">Оголошення</h2>
    <USeparator class="my-6" />
    <PostList :posts="posts" category-color="blue" empty-text="Оголошень ще немає" />
  </UContainer>
</template>
