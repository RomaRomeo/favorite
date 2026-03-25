import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

function getContentSlugs(collection: string): string[] {
  const dir = resolve(__dirname, 'content', collection)
  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => `/${collection}/${f.replace(/\.md$/, '')}`)
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  modules: ['@nuxt/ui', '@nuxtjs/sitemap', '@nuxt/image', '@nuxt/content', 'nuxt-studio'],
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://favorite.lviv.ua',
    name: 'Фаворит ТВ/НЕТ',
  },
  colorMode: {
    preference: 'light'
  },
  experimental: {
    payloadExtraction: false,
  },
  routeRules: {
    '/': { prerender: true },
    '/news': { prerender: true },
    '/news/**': { prerender: true },
    '/promo': { prerender: true },
    '/promo/**': { prerender: true },
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/news',
        '/promo',
        ...getContentSlugs('news'),
        ...getContentSlugs('promo'),
      ],
    },
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'RomaRomeo',
      repo: 'favorite-3',
      branch: 'master',
    },
    i18n: { defaultLocale: 'ua' },
    git: {
      commit: { messagePrefix: 'content:' },
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
      ],
    },
  },
})
