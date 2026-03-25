export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(modalInjectionKey, _modalState)
})
