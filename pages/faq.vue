<script setup lang="ts">
useSeoMeta({
  title: 'Часті питання',
  description: 'Відповіді на часті питання про інтернет-послуги Фаворит ТВ/НЕТ: підключення, тарифи, оплата, налаштування.',
  ogTitle: 'FAQ | Фаворит ТВ/НЕТ',
  ogDescription: 'Відповіді на популярні питання про послуги інтернет-провайдера Фаворит.',
  ogImage: '/images/slides/seo_banner.png',
})

const items = [
  {
    label: 'Як підключити інтернет?',
    content: 'Зателефонуйте на наш номер або залиште заявку на сайті. Наш спеціаліст зв\'яжеться з вами для узгодження часу підключення. Підключення зазвичай займає 1-3 робочих дні.',
  },
  {
    label: 'Яка швидкість інтернету?',
    content: 'Ми пропонуємо тарифні плани зі швидкістю від 100 Мбіт/с до 1 Гбіт/с. Швидкість залежить від обраного тарифу та технічних можливостей у вашому населеному пункті.',
  },
  {
    label: 'Як оплатити послуги?',
    content: 'Оплатити можна через ПриватБанк (Приват24), EasyPay або в нашому офісі. Детальніше — на сторінці "Оплата".',
  },
  {
    label: 'Що робити, якщо немає інтернету?',
    content: 'Перевірте з\'єднання кабелів та перезавантажте роутер. Якщо проблема не зникла — зверніться до служби підтримки за телефоном. Ми працюємо Пн-Сб.',
  },
  {
    label: 'Як перевірити швидкість з’єднання?',
    content: 'Онлайн-тест вимірює швидкість між вашим пристроєм і вибраним сервером. Для більш точного результату підключіть ПК до роутера кабелем і тимчасово вимкніть завантаження на інших пристроях. Нижче на сторінці є посилання на перевірку через Speedtest.',
  },
  {
    label: 'Чи є обмеження трафіку?',
    content: 'Ні, усі наші тарифні плани мають необмежений трафік. Ви можете користуватися інтернетом без будь-яких обмежень.',
  },
  {
    label: 'Чи можна змінити тариф?',
    content: 'Так, ви можете змінити тариф у будь-який час, звернувшись до служби підтримки або через особистий кабінет. Зміна тарифу набуває чинності з наступного розрахункового періоду.',
  },
  {
    label: 'Яке обладнання потрібне?',
    content: 'Для підключення потрібен Wi-Fi роутер. Ви можете використовувати свій або придбати більш сучасний у нас. Наші спеціалісти допоможуть з налаштуванням.',
  },
]
</script>

<template>
  <UContainer class="pt-10 md:pt-12 pb-16">
    <div class="max-w-3xl mx-auto">
      <!-- Intro -->
      <div class="text-center mb-10">
        <span class="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
          Підтримка
        </span>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Часті питання</h1>
        <p class="text-slate-500">
          Короткі відповіді про підключення, тарифи та роботу мережі — далі можна перевірити швидкість одним кліком.
        </p>
      </div>

      <!-- FAQ -->
      <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
        <UAccordion :items="items" class="cursor-pointer" />
      </div>

      <!-- Speedtest -->
      <div class="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div class="flex gap-4">
          <div class="hidden sm:flex w-12 h-12 rounded-xl bg-blue-50 items-center justify-center shrink-0">
            <UIcon name="i-heroicons-signal-20-solid" class="w-6 h-6 text-blue-600" />
          </div>
          <div class="min-w-0 flex-1">
            <h2 class="text-base font-semibold text-slate-900">
              Перевірка швидкості
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              Корисно, якщо інтернет працює нестабільно або повільніше за тариф: тест покаже фактичну швидкість до сервера.
              Для точнішого результату підключіть пристрій кабелем до роутера.
            </p>
            <a
              href="https://www.speedtest.net/"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
            >
              Відкрити Speedtest
              <span aria-hidden="true">→</span>
            </a>
            <p class="mt-3 text-xs text-slate-500">
              Якщо результат сильно нижчий за заявлений у тарифі після перевірки по кабелю — напишіть або зателефонуйте в підтримку.
            </p>
          </div>
        </div>
      </div>

      <!-- Support CTA -->
      <div class="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-chat-bubble-left-right-20-solid" class="w-6 h-6 text-blue-600" />
        </div>
        <div class="text-center sm:text-left flex-1">
          <h3 class="text-base font-bold text-slate-900">Не знайшли відповідь?</h3>
          <p class="text-sm text-slate-500 mt-0.5">Наша команда підтримки завжди готова допомогти</p>
        </div>
        <UButton
          label="Зв'язатися"
          to="/contact"
          color="neutral"
          variant="outline"
          size="lg"
          class="shrink-0"
        />
      </div>
    </div>
  </UContainer>
</template>
