<script setup lang="ts">
import { siteConfig } from '~/config/site'

const links = [
  {
    title: "Продукти",
    links: [
      { label: "Інтернет", url: "/internet" },
      { label: "Цифрове ТБ", url: "/tv/ip" },
      { label: "Кабельне ТБ", url: "/tv/cable" },
    ],
  },
  {
    title: "Налаштування",
    links: [
      { label: "Комп'ютера", url: "/config/windows" },
      { label: "Роутера", url: "/config/routers" },
    ],
  },
  {
    title: "Підтримка",
    links: [
      { label: "Контакти", url: "/contact" },
      { label: "Оплата", url: "/payment" },
      { label: "FAQ", url: "/faq" },
    ],
  },
  {
    title: "Контакти",
    links: siteConfig.phones.map((phone) => ({ label: phone })),
  },
];

const socials = [
  { name: 'Facebook', link: siteConfig.social.facebook, component: 'BaseIconSocialFacebook' },
  { name: 'Viber', link: siteConfig.social.viber, component: 'BaseIconSocialViber' },
  { name: 'Telegram', link: siteConfig.social.telegram, component: 'BaseIconSocialTelegram' },
]
</script>

<template>
  <BaseFooter>
    <template #left>
      <NuxtLink to="/" class="inline-block">
        <img
          src="/images/logo/logo_light.png"
          width="148"
          aria-label="Favorite logo"
          alt="Favorite logo"
        />
      </NuxtLink>

      <p class="mt-3 text-sm text-slate-500 max-w-xs leading-relaxed">
        Інтернет-провайдер у Ходорові та регіоні. Швидкий інтернет, цифрове та кабельне телебачення.
      </p>

      <div class="flex items-center gap-3 mt-6">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.name"
          class="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
        >
          <BaseIconSocialFacebook v-if="s.name === 'Facebook'" class="w-4 h-4 text-slate-400" />
          <BaseIconSocialViber v-if="s.name === 'Viber'" class="w-4 h-4 text-slate-400" />
          <BaseIconSocialTelegram v-if="s.name === 'Telegram'" class="w-4 h-4 text-slate-400" />
        </a>
      </div>
    </template>

    <template #middle>
      <BaseFooterLinks :sections="links" />
    </template>
  </BaseFooter>
</template>
