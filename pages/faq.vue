<script setup lang="ts">
useSeoMeta({
  title: 'Часті питання',
  description: 'Відповіді на часті питання про інтернет-послуги Фаворит ТВ/НЕТ: підключення, тарифи, оплата, налаштування.',
  ogTitle: 'FAQ | Фаворит ТВ/НЕТ',
  ogDescription: 'Відповіді на популярні питання про послуги інтернет-провайдера Фаворит.',
  ogImage: '/images/logo/logo-dark.png',
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
    label: 'Чи є обмеження трафіку?',
    content: 'Ні, усі наші тарифні плани мають необмежений трафік. Ви можете користуватися інтернетом без будь-яких обмежень.',
  },
  {
    label: 'Чи можна змінити тариф?',
    content: 'Так, ви можете змінити тариф у будь-який час, звернувшись до служби підтримки або через особистий кабінет. Зміна тарифу набуває чинності з наступного розрахункового періоду.',
  },
  {
    label: 'Які населені пункти обслуговуються?',
    content: 'Ми обслуговуємо 23 населених пункти у Ходорівському районі. Щоб перевірити доступність у вашому населеному пункті, скористайтеся перевіркою покриття на головній сторінці або зателефонуйте нам.',
  },
  {
    label: 'Яке обладнання потрібне?',
    content: 'Для підключення потрібен Wi-Fi роутер. При підключенні ми можемо надати роутер в оренду або ви можете використовувати власний. Наші спеціалісти допоможуть з налаштуванням.',
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
        <p class="text-slate-500">Відповіді на найпопулярніші питання наших абонентів</p>
      </div>

      <!-- FAQ -->
      <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 mb-10">
        <UAccordion :items="items" class="cursor-pointer" />
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
