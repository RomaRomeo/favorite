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
    await $fetch('https://forminit.com/f/bejrjqda', {
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
    <section class="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-48 -right-48 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[150px]" />
        <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[130px]" />
        <div class="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[180px]" />
      </div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <UContainer class="relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-20 lg:pt-28 pb-32 lg:pb-40">
          <div class="max-w-xl">
            <h1 class="text-4xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight">
              Швидкий інтернет у Ходорові та регіоні
            </h1>
            <p class="mt-7 text-lg leading-relaxed text-blue-100/65 max-w-md">
              Стабільне оптоволоконне з'єднання до 1 Гбіт/с, цифрове та кабельне телебачення. Підключення від 200 грн/міс.
            </p>
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 mt-10">
              <UButton
                label="Обрати тариф"
                to="/internet"
                size="xl"
                class="!rounded-xl !border-0 !bg-gradient-to-r !from-blue-600 !via-sky-500 !to-cyan-500 !text-white !font-semibold !px-10 !shadow-lg !shadow-cyan-500/25 !ring-1 !ring-white/20 hover:!-translate-y-0.5 hover:!shadow-xl hover:!shadow-cyan-400/35 active:!translate-y-0 active:!scale-[0.98] !transition-all !duration-200"
              />
              <UButton
                label="Зв'язатися"
                to="/contact"
                size="xl"
                variant="ghost"
                class="!rounded-xl !border !border-white/35 !bg-white/12 !text-white !backdrop-blur-md !font-medium !px-7 !shadow-sm !ring-0 hover:!border-white/55 hover:!bg-white/20 hover:!-translate-y-0.5 hover:!shadow-md active:!translate-y-0 active:!scale-[0.98] !transition-all !duration-200"
              />
            </div>
          </div>
          <div class="hidden lg:flex justify-end">
            <div class="relative">
              <NuxtImg
                src="/images/slides/hero_img_1.png"
                alt="Фаворит ТВ/НЕТ — швидкий інтернет"
                class="relative z-10 w-full max-w-[560px] rounded-xl object-cover"
                loading="eager"
              />
              <div class="absolute -inset-8 bg-gradient-to-tr from-blue-500/15 via-transparent to-cyan-400/10 rounded-2xl blur-3xl" />
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Metrics strip (informational, non-interactive) -->
    <section class="relative z-20 -mt-16 lg:-mt-20 pb-2">
      <UContainer class="relative z-20">
        <div
          class="relative z-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_36px_-12px_rgba(15,23,42,0.1),0_24px_56px_-20px_rgba(15,23,42,0.07)]"
        >
          <div
            class="grid grid-cols-2 divide-y divide-slate-200/70 lg:grid-cols-4 lg:divide-x lg:divide-y-0"
          >
            <div
              v-for="block in trustBlocks"
              :key="block.label"
              class="flex cursor-default select-none items-center gap-3 px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-5 lg:flex-col lg:items-center lg:justify-center lg:gap-2 lg:px-6 lg:py-6"
            >
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600"
                aria-hidden="true"
              >
                <UIcon :name="block.icon" class="h-3.5 w-3.5" />
              </div>
              <div class="min-w-0 flex-1 text-left lg:flex-none lg:text-center">
                <p class="text-xl font-bold tabular-nums tracking-tight text-slate-900 sm:text-2xl">
                  {{ block.value }}
                </p>
                <p class="mt-0.5 text-[11px] font-medium leading-snug text-slate-400 sm:text-xs">
                  {{ block.label }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features -->
    <section class="bg-slate-50 pt-6">
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
