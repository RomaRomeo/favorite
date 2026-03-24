// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/sitemap', '@nuxt/image', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://favorite.lviv.ua',
    name: 'Фаворит ТВ/НЕТ',
  },
  colorMode: {
    preference: 'light'
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
