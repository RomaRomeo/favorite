<script setup lang="ts">
import { ModalRouterConfig } from "#components";

useSeoMeta({
  title: 'Налаштування роутерів',
  description: 'Покрокові інструкції з налаштування Wi-Fi роутерів TP-Link та Netis від Фаворит ТВ/НЕТ.',
  ogTitle: 'Налаштування роутерів | Фаворит ТВ/НЕТ',
  ogDescription: 'Детальні інструкції з налаштування популярних Wi-Fi роутерів.',
  ogImage: '/images/logo/logo-dark.png',
})

const modal = useModal();

const { data } = await useFetch<{ data: any[] }>('/json/config-routers.json')
const articles = computed(() => data.value?.data ?? [])

function onSelectRouterClick(id: string) {
  modal.open(ModalRouterConfig, { type: id });
}
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <h2 class="text-3xl font-semibold text-slate-900 mb-4">
      Як налаштувати Wi-Fi роутер: покрокові інструкції для популярних моделей
    </h2>

    <USeparator orientation="horizontal" class="my-8" />

    <p class="text-lg text-slate-500 mb-10">
      Найдетальніший гід із налаштування домашніх Wi-Fi роутерів — від підключення до інтернету до захисту мережі.
      Доступні інструкції для TP-Link, Netis, та інших моделей з прикладами, скріншотами та порадами.
    </p>

    <ArticleCardsList :articles="articles" @on-card-click="onSelectRouterClick" />
  </UContainer>
</template>
