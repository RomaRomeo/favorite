<script setup lang="ts">
import { ModalWindowsConfig } from "#components";
import { configWindows } from "~/data/config-windows";

useSeoMeta({
  title: 'Налаштування PPPoE у Windows',
  description: 'Покрокові інструкції з налаштування PPPoE підключення у Windows 11, 10, 7 та XP від Фаворит ТВ/НЕТ.',
  ogTitle: 'Налаштування PPPoE у Windows | Фаворит ТВ/НЕТ',
  ogDescription: 'Детальні інструкції з налаштування інтернет-підключення PPPoE у Windows.',
  ogImage: '/images/logo/logo.png',
})

const modal = useModal();

const articles = configWindows

function onSelectInternetPlanClick(id: string) {
  modal.open(ModalWindowsConfig, { type: id });
}
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <h2 class="text-3xl font-semibold text-slate-900 mb-4">
      Як налаштувати PPPoE підключення у Windows: покрокова інструкція
    </h2>

    <USeparator orientation="horizontal" class="my-8" />

    <p class="text-lg text-slate-500 mb-10">
      Налаштування PPPoE підключення у Windows дозволяє отримати доступ до
      інтернету. У цих статтях ви знайдете покрокову інструкцію зі створення та
      налаштування PPPoE-з'єднання, поради щодо усунення можливих проблем та
      оптимізації підключення для стабільної роботи.
    </p>

    <ArticleCardsList :articles="articles" @on-card-click="onSelectInternetPlanClick" />
  </UContainer>
</template>
