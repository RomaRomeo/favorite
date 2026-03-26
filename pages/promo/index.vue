<script setup lang="ts">
useSeoMeta({
  title: 'Акції',
  description: 'Актуальні акції від Фаворит ТВ/НЕТ. Знижки на підключення, бонуси для нових абонентів та спеціальні пропозиції.',
  ogTitle: 'Акції | Фаворит ТВ/НЕТ',
  ogDescription: 'Знижки на підключення, бонуси та спеціальні пропозиції від інтернет-провайдера Фаворит.',
  ogImage: '/images/slides/seo_banner.png',
})

const { data: posts } = await useAsyncData('promo', () =>
  queryCollection('promo').order('date', 'DESC').all()
)
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <h2 class="text-3xl font-semibold text-slate-900 mb-4">Акції</h2>
    <USeparator class="my-6" />
    <PostList :posts="posts" category-color="amber" link-text="Детальніше" empty-text="Акцій ще немає" />
  </UContainer>
</template>
