<script setup lang="ts">
import { siteConfig } from '~/config/site'

const messengers = [
  {
    name: 'Facebook',
    description: 'Новини та оновлення',
    link: siteConfig.social.facebook,
    iconComponent: 'BaseIconSocialFacebook',
    color: 'text-[#0966ff]',
    bg: 'bg-blue-50',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    name: 'Viber',
    description: 'Швидкі повідомлення',
    link: siteConfig.social.viber,
    iconComponent: 'BaseIconSocialViber',
    color: 'text-[#675da9]',
    bg: 'bg-purple-50',
    hoverBorder: 'hover:border-purple-300',
  },
  {
    name: 'Telegram',
    description: 'Оперативний зв\'язок',
    link: siteConfig.social.telegram,
    iconComponent: 'BaseIconSocialTelegram',
    color: 'text-[#1E96C8]',
    bg: 'bg-cyan-50',
    hoverBorder: 'hover:border-cyan-300',
  },
]
</script>

<template>
  <div class="max-w-3xl mx-auto text-center">
    <span class="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
      Швидкий зв'язок
    </span>
    <h2 class="text-2xl font-bold text-slate-900 lg:text-3xl">
      Ми у месенджерах
    </h2>
    <p class="text-slate-500 mt-2 mb-8 max-w-md mx-auto">
      Обирайте зручний спосіб зв'язку з нами
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <a
        v-for="m in messengers"
        :key="m.name"
        :href="m.link"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex flex-col items-center gap-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        :class="m.hoverBorder"
      >
        <div
          class="w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300"
          :class="m.bg"
        >
          <BaseIconSocialFacebook v-if="m.name === 'Facebook'" class="w-8 h-8" :class="m.color" />
          <BaseIconSocialViber v-if="m.name === 'Viber'" class="w-8 h-8" :class="m.color" />
          <BaseIconSocialTelegram v-if="m.name === 'Telegram'" class="w-8 h-8" :class="m.color" />
        </div>
        <span class="text-base font-semibold text-slate-900">{{ m.name }}</span>
        <span class="text-sm text-slate-500">{{ m.description }}</span>
      </a>
    </div>
  </div>
</template>
