<script setup lang="ts">
import { ModalPlansSubmit } from "#components";
import { internetPlans } from "~/data/internet-plans";

useSeoMeta({
  title: 'Тарифні плани Інтернет',
  description: 'Тарифи на інтернет у Ходорові та регіоні від 200 грн/міс. Швидкість до 1 Гбіт/с. Безлімітний трафік.',
  ogTitle: 'Тарифні плани Інтернет | Фаворит ТВ/НЕТ',
  ogDescription: 'Оберіть оптимальний тариф для інтернету. Швидкість до 1 Гбіт/с від 200 грн/міс.',
  ogImage: '/images/logo/logo.png',
})

const modal = useModal();
const selectedCategory = ref("ходорів");

const plans = computed(() => internetPlans);
const filteredPlans = computed(() => plans.value.filter((p) => p.category === selectedCategory.value));
const categories = computed(() => [...new Set(plans.value.map((plan) => plan.category))]);

function onSelectInternetPlanClick(plan: Plan) {
  modal.open(ModalPlansSubmit, plan);
}
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <h2 class="text-3xl font-semibold text-slate-900 mb-4">
      Тарифні плани для інтернету
    </h2>

    <USeparator orientation="horizontal" class="my-8" />

    <p class="text-lg text-slate-500 mb-10">
      Оберіть оптимальний тариф для вашого використання інтернету. Ми пропонуємо
      різні варіанти швидкості та ціни для кожного користувача.
    </p>

    <BaseToggle
      v-if="categories.length"
      v-model="selectedCategory"
      :options="categories"
      class="mb-12"
    />

    <BaseList
      :items="filteredPlans"
      :loading="false"
      :error="undefined"
      list-class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      <template #item="{ item }">
        <CardPlan
          v-bind="item"
          @onCardClick="onSelectInternetPlanClick(item)"
        />
      </template>
      <template #loading>
        <CardPlanSkeleton />
      </template>
    </BaseList>
  </UContainer>
</template>
