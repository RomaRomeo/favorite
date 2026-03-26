<script setup lang="ts">
import { siteConfig } from '~/config/site'

const contacts = [
  {
    title: 'Телефон підтримки',
    subtitle: 'Ми на зв\'язку у робочий час',
    description: siteConfig.workHours,
    details: [...siteConfig.phones],
    icon: 'i-heroicons-phone-20-solid',
    isLink: true,
  },
  {
    title: 'Електронна пошта',
    subtitle: 'Відповідаємо упродовж 24 годин',
    details: [siteConfig.email],
    icon: 'i-heroicons-envelope-20-solid',
    isLink: true,
  },
  {
    title: 'Адреса офісу',
    subtitle: 'Завітайте особисто',
    details: [siteConfig.address],
    icon: 'i-heroicons-map-pin-20-solid',
    isLink: false,
  },
]

const helpItems = [
  { icon: 'i-heroicons-plus-circle-20-solid', text: 'Подача заявки на підключення до мережі' },
  { icon: 'i-heroicons-chat-bubble-left-right-20-solid', text: 'Консультації щодо роботи провайдера' },
  { icon: 'i-heroicons-megaphone-20-solid', text: 'Замовлення оголошення на «Інфоканалі»' },
  { icon: 'i-heroicons-wrench-screwdriver-20-solid', text: 'Виклик фахівця для ремонту чи монтажу' },
]
</script>

<template>
  <div>
    <!-- Intro -->
    <div class="text-center mb-10">
      <span class="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
        Контакти
      </span>
      <h1 class="text-3xl font-bold text-slate-900 mb-2">Ми на зв'язку</h1>
      <p class="text-slate-500">Наша команда з радістю допоможе вам</p>
    </div>

    <!-- Contact cards + Map -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
      <div class="flex flex-col gap-4">
        <ContactItem
          v-for="(contact, i) in contacts"
          :key="i"
          v-bind="contact"
        />
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
          <div class="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
            <UIcon name="i-heroicons-map-20-solid" class="w-4 h-4 text-slate-400" />
            <span class="text-sm font-medium text-slate-700">Наш офіс на карті</span>
          </div>
          <div class="flex-1 min-h-[320px]">
            <iframe
              :src="siteConfig.mapEmbedUrl"
              width="100%"
              height="100%"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Help items -->
    <div class="mb-10">
      <h2 class="text-lg font-bold text-slate-900 mb-4 text-center">Ми допоможемо вам з:</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="item in helpItems"
          :key="item.text"
          class="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3"
        >
          <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <UIcon :name="item.icon" class="w-4.5 h-4.5 text-blue-600" />
          </div>
          <span class="text-sm text-slate-700">{{ item.text }}</span>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 border border-slate-200 rounded-2xl p-6">
      <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <UIcon name="i-heroicons-phone-arrow-up-right-20-solid" class="w-6 h-6 text-blue-600" />
      </div>
      <div class="text-center sm:text-left flex-1">
        <h3 class="text-base font-bold text-slate-900">Потрібна допомога прямо зараз?</h3>
        <p class="text-sm text-slate-500 mt-0.5">Зателефонуйте — ми відповімо у робочий час</p>
      </div>
      <a
        :href="`tel:${siteConfig.phones[0].replace(/\s/g, '')}`"
        class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shrink-0"
      >
        {{ siteConfig.phones[0] }}
      </a>
      <a
        :href="`tel:${siteConfig.phones[0].replace(/\s/g, '')}`"
        class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shrink-0"
      >
        {{ siteConfig.phones[1] }}
      </a>
    </div>
  </div>
</template>
