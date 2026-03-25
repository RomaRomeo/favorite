<script setup lang="ts">
import { siteConfig } from '~/config/site'

useSeoMeta({
  title: 'Оплата',
  description: 'Оплата інтернет-послуг Фаворит ТВ/НЕТ через ПриватБанк або EasyPay. Швидко, безпечно, без комісій.',
  ogTitle: 'Оплата послуг | Фаворит ТВ/НЕТ',
  ogDescription: 'Оплатіть інтернет-послуги онлайн через ПриватБанк або EasyPay без комісій.',
  ogImage: '/images/logo/logo_dark.png',
})

const privatbankLink = siteConfig.payment.privatbank
const easyPayLink = siteConfig.payment.easypay
const qrCodeLink = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${privatbankLink}`

const selected = ref<'privat' | 'easypay' | null>(null)

const { data: faqData } = await useAsyncData('payment-faq', () =>
  $fetch<{ data: any[] }>('/json/payment-faq.json'),
  { default: () => ({ data: [] as any[] }) },
)
const items = computed(() => faqData.value?.data ?? [])
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-slate-900">Оплата послуг</h1>
        <p class="mt-2 text-slate-500">Оберіть зручний спосіб оплати — швидко, безпечно, без комісій</p>
      </div>

      <!-- Payment methods -->
      <div class="grid gap-3 mb-4">
        <button
          @click="selected = 'privat'"
          class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left"
          :class="selected === 'privat'
            ? 'bg-blue-50/50 border-blue-500 shadow-md ring-1 ring-blue-500/20'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'"
        >
          <img src="/svg/privat24.svg" alt="ПриватБанк" class="w-24 h-12 shrink-0 object-contain" />
          <div class="flex-1 min-w-0">
            <span class="text-base font-semibold text-slate-900">ПриватБанк / Privat24</span>
            <p class="text-sm text-slate-500 mt-0.5">Оплата онлайн або через QR-код</p>
          </div>
          <div
            class="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors"
            :class="selected === 'privat' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'"
          >
            <div v-if="selected === 'privat'" class="w-2 h-2 rounded-full bg-white" />
          </div>
        </button>

        <button
          @click="selected = 'easypay'"
          class="flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left"
          :class="selected === 'easypay'
            ? 'bg-blue-50/50 border-blue-500 shadow-md ring-1 ring-blue-500/20'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'"
        >
          <img src="/svg/easypay.svg" alt="EasyPay" class="w-24 h-12 shrink-0 object-contain" />
          <div class="flex-1 min-w-0">
            <span class="text-base font-semibold text-slate-900">EasyPay</span>
            <p class="text-sm text-slate-500 mt-0.5">Швидка оплата без реєстрації</p>
          </div>
          <div
            class="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors"
            :class="selected === 'easypay' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'"
          >
            <div v-if="selected === 'easypay'" class="w-2 h-2 rounded-full bg-white" />
          </div>
        </button>
      </div>

      <!-- Details panel -->
      <div class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out" :class="selected ? 'grid-rows-[1fr]' : ''">
        <div class="overflow-hidden">
          <div
            class="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm transition-opacity duration-300"
            :class="selected ? 'opacity-100' : 'opacity-0'"
          >
            <template v-if="selected === 'privat'">
              <img
                :src="qrCodeLink"
                alt="QR-код для оплати"
                class="mx-auto w-36 h-36 rounded-xl border border-slate-200 mb-4"
              />
              <p class="text-sm text-slate-500 mb-5">
                Відскануйте QR-код у Privat24 або скористайтесь кнопкою нижче
              </p>
              <a
                :href="privatbankLink"
                target="_blank"
                class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Оплатити через Privat24
              </a>
            </template>
            <template v-else-if="selected === 'easypay'">
              <p class="text-sm text-slate-500 mb-5">
                Ви будете перенаправлені на сайт EasyPay для завершення оплати
              </p>
              <a
                :href="easyPayLink"
                target="_blank"
                class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Перейти до EasyPay
              </a>
            </template>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mt-16 pt-10 border-t border-slate-200">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Часті питання</h2>
        <UAccordion :items="items" />
      </div>

      <!-- Support CTA -->
      <div class="mt-10 text-center">
        <UButton
          label="Зв'язатися з підтримкою"
          to="/contact"
          color="neutral"
          variant="outline"
          size="lg"
        />
      </div>
    </div>
  </UContainer>
</template>
