<script setup lang="ts">
useHead({
  titleTemplate: '%s | Фаворит ТВ/НЕТ',
  htmlAttrs: { lang: 'uk' },
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Фаворит ТВ/НЕТ',
      url: 'https://favorite.lviv.ua',
      telephone: ['+380679361073', '+380939361073'],
      email: 'tv.net@ukr.net',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'вул. Шептицького, 9',
        addressLocality: 'Ходорів',
        postalCode: '81750',
        addressCountry: 'UA',
      },
      areaServed: {
        '@type': 'Place',
        name: 'Ходорівський район, Львівська область',
      },
      priceRange: 'від 200 грн/міс',
    }),
  }],
})
</script>

<template>
  <div>
    <ModalClient />
    <BaseToast />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
