<script setup lang="ts">
import { ModalPlansSubmit } from "#components";
import { cablePlans } from "~/data/cable-plans";

useSeoMeta({
  title: 'Кабельне телебачення',
  description: 'Тарифи кабельного телебачення від Фаворит ТВ/НЕТ у Ходорові. 100 каналів від 100 грн/міс.',
  ogTitle: 'Кабельне ТБ | Фаворит ТВ/НЕТ',
  ogDescription: 'Кабельне телебачення у Ходорові. 100 каналів від 100 грн/міс.',
  ogImage: '/images/slides/seo_banner.png',
})

const modal = useModal();
const selectedCategory = ref("ходорів");

const plans = computed(() => cablePlans);
const filteredPlans = computed(() => plans.value.filter((p) => p.category === selectedCategory.value));
const categories = computed(() => [...new Set(plans.value.map((plan) => plan.category))]);

function onSelectPlanClick(plan: Plan) {
  modal.open(ModalPlansSubmit, plan);
}

const benefits = [
  { icon: 'i-heroicons-tv-20-solid', title: '100+ каналів', description: 'Широкий вибір українських та міжнародних каналів.' },
  { icon: 'i-heroicons-signal-20-solid', title: 'Стабільний сигнал', description: 'Надійне кабельне з\'єднання без переривань.' },
  { icon: 'i-heroicons-bolt-20-solid', title: 'Просте підключення', description: 'Швидке налаштування без складних пристроїв.' },
  // { icon: 'i-heroicons-credit-card-20-solid', title: 'Зручна оплата', description: 'Онлайн через ПриватБанк або EasyPay.' },
]
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <!-- Intro -->
    <div class="text-center max-w-2xl mx-auto mb-10">
      <div class="flex items-center justify-center flex-col gap-3 mb-3">
        <h1 class="text-3xl font-bold text-slate-900">Кабельне телебачення</h1>
        <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full whitespace-nowrap">
          <UIcon name="i-heroicons-map-pin-20-solid" class="w-3 h-3" />
          Ходорів
        </span>
      </div>
      <p class="text-slate-500">
        Насолоджуйтесь улюбленими телеканалами з надійним кабельним з'єднанням. Вигідні умови для всієї родини.
      </p>
    </div>

    <!-- Benefits -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-14 ">
      <div
        v-for="item in benefits"
        :key="item.title"
        class="w-full max-w-[340px] mx-auto text-center bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      >
        <div class="w-11 h-11 mx-auto rounded-xl bg-blue-50 flex items-center justify-center mb-3">
          <UIcon :name="item.icon" class="w-5 h-5 text-blue-600" />
        </div>
        <h4 class="text-sm font-bold text-slate-900 mb-1">{{ item.title }}</h4>
        <p class="text-xs text-slate-500 leading-relaxed">{{ item.description }}</p>
      </div>
    </div>

    <!-- Plan -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-slate-900">Тарифний план</h2>
      <p class="text-sm text-slate-500 mt-1">Один простий тариф — без прихованих умов</p>
    </div>

    <BaseToggle
      v-if="categories.length > 1"
      v-model="selectedCategory"
      :options="categories"
      class="mb-10"
    />

    <BaseList
      :items="filteredPlans"
      :loading="false"
      :error="undefined"
      list-class="flex justify-center"
    >
      <template #item="{ item }">
        <CardPlan
          class="max-w-[340px]"
          v-bind="item"
          @onCardClick="onSelectPlanClick(item)"
        />
      </template>
      <template #loading>
        <CardPlanSkeleton />
      </template>
    </BaseList>

    <div class="text-center mt-10">
      <UButton
        label="Підключити цей тариф"
        to="/contact"
        size="lg"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
      />
    </div>
  </UContainer>
</template>
