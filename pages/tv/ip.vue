<script setup lang="ts">
useSeoMeta({
  title: 'Цифрове ТБ (IPTV) Sweet TV',
  description: 'Цифрове телебачення Sweet TV від Фаворит ТВ/НЕТ. Понад 260 каналів у HD-якості, онлайн-кінотеатри, перегляд на будь-якому пристрої.',
  ogTitle: 'Цифрове ТБ Sweet TV | Фаворит ТВ/НЕТ',
  ogDescription: 'Понад 260 каналів у HD-якості. Гнучкі тарифи без прихованих платежів.',
  ogImage: '/images/logo/logo-dark.png',
})

const benefits = [
  {
    icon: 'i-heroicons-signal-20-solid',
    title: 'Більше 260 каналів',
    description: 'HD та преміум-контент від найкращих провайдерів телебачення.',
  },
  {
    icon: 'i-heroicons-film-20-solid',
    title: 'Онлайн-кінотеатри',
    description: 'Доступ до ексклюзивного контенту та нових фільмів.',
  },
  {
    icon: 'i-heroicons-banknotes-20-solid',
    title: 'Гнучкі тарифи',
    description: 'Прозорі ціни без прихованих платежів та комісій.',
  },
  {
    icon: 'i-heroicons-device-phone-mobile-20-solid',
    title: 'Будь-який пристрій',
    description: 'Смартфон, планшет, Smart TV — дивіться де зручно.',
  },
]
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <h2 class="text-3xl font-bold text-slate-900 mb-3">
      Цифрове телебачення Sweet TV
    </h2>
    <p class="text-lg text-slate-500 max-w-2xl mb-10">
      Обирайте тарифний план та насолоджуйтесь сотнями каналів у HD-якості.
      Вигідні умови від вашого локального провайдера.
    </p>

    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-12">
      <BaseFrame src="https://sweet.tv/widget/4" />
    </div>

    <div class="mb-12">
      <div class="text-center mb-8">
        <span class="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
          Переваги
        </span>
        <h3 class="text-2xl font-bold text-slate-900">
          Чому варто обрати Sweet TV?
        </h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div
          v-for="item in benefits"
          :key="item.title"
          class="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          <div class="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <UIcon :name="item.icon" class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900 mb-1">{{ item.title }}</h4>
            <p class="text-sm text-slate-500 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <UButton
        label="Подати заявку на підключення"
        to="/contact"
        size="xl"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
      />
    </div>
  </UContainer>
</template>
