<script setup lang="ts">
import { siteConfig } from '~/config/site'

useSeoMeta({
  title: 'Головна',
  description: 'Фаворит ТВ/НЕТ — інтернет-провайдер у Ходорові та регіоні. Швидкий інтернет, цифрове та кабельне телебачення.',
  ogTitle: 'Фаворит ТВ/НЕТ — Інтернет та телебачення у Ходорові',
  ogDescription: 'Швидкий інтернет до 1 Гбіт/с, цифрове та кабельне ТБ. Підключення від 200 грн/міс.',
  ogImage: '/images/logo/logo-dark.png',
})

const trustBlocks = [
  { icon: 'i-heroicons-bolt-20-solid', value: 'до 1 Гбіт/с', label: 'Швидкість' },
  { icon: 'i-heroicons-map-pin-20-solid', value: '23 н.п.', label: 'Покриття' },
  { icon: 'i-heroicons-phone-20-solid', value: 'Підтримка', label: 'Пн–Сб' },
  { icon: 'i-heroicons-banknotes-20-solid', value: 'від 200 грн', label: 'На місяць' },
]

const selectedSettlement = ref('')

const form = reactive({
  name: '',
  phone: '',
  settlement: '',
})
const formLoading = ref(false)
const formSuccess = ref(false)

async function submitForm() {
  formLoading.value = true
  try {
    await $fetch('https://getform.io/f/ayvkkqqb', {
      method: 'POST',
      body: { ...form },
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    formSuccess.value = true
    form.name = ''
    form.phone = ''
    form.settlement = ''
  } catch {
    formSuccess.value = false
  } finally {
    formLoading.value = false
  }
}

const { data: latestPosts } = await useAsyncData('latest-posts', async () => {
  const [news, promos] = await Promise.all([
    queryCollection('news').order('date', 'DESC').all(),
    queryCollection('promo').order('date', 'DESC').all(),
  ])
  return [...news, ...promos]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-900">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div class="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-cyan-400/15 rounded-full blur-[100px]" />
      </div>

      <UContainer class="relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Швидкий інтернет у Ходорові та регіоні
            </h1>
            <p class="mt-6 text-lg text-blue-100/80 max-w-lg">
              Стабільне оптоволоконне з'єднання до 1 Гбіт/с, цифрове та кабельне телебачення. Підключення від 200 грн/міс.
            </p>
            <div class="flex flex-wrap gap-4 mt-8">
              <UButton label="Обрати тариф" to="/internet" size="xl" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8" />
              <UButton label="Зв'язатися" to="/contact" size="xl" variant="outline" class="border-white/30 text-white hover:bg-white/10" />
            </div>
          </div>
          <div class="hidden lg:block">
            <NuxtImg
              src="/images/slides/slide_1.jpg"
              alt="Фаворит ТВ/НЕТ — швидкий інтернет"
              class="rounded-2xl object-cover w-full h-[400px] shadow-2xl ring-1 ring-white/10"
              loading="eager"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Trust blocks -->
    <section class="bg-white border-b border-slate-200">
      <UContainer>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10">
          <div
            v-for="block in trustBlocks"
            :key="block.label"
            class="flex flex-col items-center text-center gap-2"
          >
            <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <UIcon :name="block.icon" class="w-7 h-7 text-blue-600" />
            </div>
            <span class="text-xl font-bold text-slate-900">{{ block.value }}</span>
            <span class="text-sm text-slate-500">{{ block.label }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features -->
    <section class="bg-slate-50">
      <UContainer>
        <FeatureCardsList :items="siteConfig.features" />
      </UContainer>
    </section>

    <!-- Latest news/promo -->
    <section class="bg-white py-16">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-slate-900 lg:text-3xl">Останні новини та акції</h2>
          <p class="max-w-lg mx-auto mt-4 text-slate-500">
            Не пропустіть наші спеціальні пропозиції: знижки на підключення, бонуси для нових абонентів!
          </p>
        </div>
        <div v-if="latestPosts?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="post in latestPosts"
            :key="post.path"
            :to="post.path"
            class="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div v-if="post.image" class="relative h-52 overflow-hidden">
              <NuxtImg
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs text-white/70">{{ post.date }}</span>
                  <span v-if="post.category" class="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {{ post.category }}
                  </span>
                </div>
                <h3 class="font-semibold text-lg leading-snug">{{ post.title }}</h3>
              </div>
            </div>
            <div v-else class="p-5 bg-white">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm text-slate-500">{{ post.date }}</span>
                <span v-if="post.category" class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {{ post.category }}
                </span>
              </div>
              <h3 class="font-semibold text-slate-800">{{ post.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- Coverage check -->
    <section class="bg-slate-50 py-16">
      <UContainer>
        <div class="max-w-xl mx-auto text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 mb-4">
            <UIcon name="i-heroicons-map-pin-20-solid" class="w-7 h-7 text-green-600" />
          </div>
          <h2 class="text-2xl font-bold text-slate-900 lg:text-3xl mb-2">Зона покриття</h2>
          <p class="text-slate-500 mb-8">
            Оберіть населений пункт, щоб перевірити доступність підключення
          </p>
          <SelectorSettlements v-model="selectedSettlement" placeholder="Оберіть населений пункт" size="xl" />
          <div v-if="selectedSettlement" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p class="text-green-700 font-medium flex items-center justify-center gap-2">
              <UIcon name="i-heroicons-check-circle-20-solid" class="w-5 h-5" />
              Підключення у {{ selectedSettlement }} доступне!
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Connect form -->
    <section class="bg-white py-16">
      <UContainer>
        <div class="max-w-xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-slate-900 lg:text-3xl">Подати заявку</h2>
            <p class="text-slate-500 mt-2">Заповніть форму, і ми зв'яжемося з вами найближчим часом</p>
          </div>
          <form
            class="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-5"
            @submit.prevent="submitForm"
          >
            <UFormField label="Ваше ім'я" required>
              <UInput v-model="form.name" placeholder="Введіть ваше ім'я" size="xl" class="w-full" />
            </UFormField>
            <UFormField label="Номер телефону" required>
              <UInput v-model="form.phone" placeholder="+380..." size="xl" class="w-full" />
            </UFormField>
            <UFormField label="Населений пункт">
              <SelectorSettlements v-model="form.settlement" placeholder="Оберіть населений пункт" size="xl" />
            </UFormField>
            <UButton
              type="submit"
              label="Відправити заявку"
              size="xl"
              class="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              :disabled="!form.name || !form.phone || formLoading"
              :loading="formLoading"
            />

            <div v-if="formSuccess" class="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
              <p class="text-green-700 font-medium flex items-center justify-center gap-2">
                <UIcon name="i-heroicons-check-circle-20-solid" class="w-5 h-5" />
                Дякуємо! Вашу заявку прийнято.
              </p>
            </div>
          </form>
        </div>
      </UContainer>
    </section>

    <!-- Messenger -->
    <section class="bg-slate-50 py-16">
      <UContainer>
        <BaseMessenger />
      </UContainer>
    </section>
  </div>
</template>
