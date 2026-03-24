<script setup lang="ts">
const props = defineProps<{
  type: string;
}>();

const modal = useModal();

const guides = {
  "windows-xp": {
    title: "Налаштування PPPoE підключення на Windows XP",
    description: "Покрокова інструкція для створення підключення PPPoE у Windows XP.",
    steps: [
      {
        hideStepper: false,
        image: "/images/guides/windows-xp/step1.jpg",
        description: "На робочому столі відкрийте 'Мій комп'ютер', а в ньому 'Панель керування'. Тут відкривайте 'Мережеві підключення'",
      },
      {
        image: "/images/guides/windows-xp/step2.jpg",
        description: "У пункті меню 'Файл' виберіть 'Нове підключення'",
      },
      {
        image: "/images/guides/windows-xp/step3.jpg",
        description: "Натисніть 'Далі' у майстрі нових підключень.",
      },
      {
        image: "/images/guides/windows-xp/step4.jpg",
        description: "У вікні 'Майстер нових підключень' натискайте 'Далі', потім виберіть 'Установити підключення вручну' і натисніть 'Далі'.",
      },
      {
        image: "/images/guides/windows-xp/step5.jpg",
        description: "Виберіть 'Через високошвидкісне підключення, яке потребує вказання ім'я користувача та пароля' і натисніть 'Далі'.",
      },
      {
        image: "/images/guides/windows-xp/step6.jpg",
        description: "У полі 'Ім'я постачальника послуг' введіть назву з'єднання, наприклад, 'Інтернет', і натисніть 'Далі'.",
      },
      {
        image: "/images/guides/windows-xp/step7.jpg",
        description: "У поля 'Ім'я користувача' і 'Пароль' введіть ім'я (логін) та пароль для входу в Інтернет і натисніть 'Далі'.",
      },
      {
        image: "/images/guides/windows-xp/step8.jpg",
        description: "Встановіть пункт 'Додати ярлик підключення на робочий стіл' і натисніть 'Готово'",
      },
      {
        description: "Для підключення до інтернету натисніть 'Підключення'.",
      },
    ],
  },
  "windows-7": {
    title: "Налаштування PPPoE підключення на Windows 7",
    description: "Покрокова інструкція для створення підключення PPPoE у Windows 7.",
    steps: [
      {
        image: "/images/guides/windows7/step1.png",
        description: "Натисніть кнопку 'Пуск', потім відкрийте 'Панель керування'.",
        hideStepper: false,
      },
      {
        image: "/images/guides/windows7/step2.png",
        description: "Перейдіть до розділу 'Мережа й Інтернет'.",
      },
      {
        image: "/images/guides/windows7/step3.png",
        description: "Відкрийте 'Центр мережних підключень і спільного доступу'.",
      },
      {
        image: "/images/guides/windows7/step4.png",
        description: "Натисніть 'Настроїти нове підключення або мережу'.",
      },
      {
        image: "/images/guides/windows7/step5.png",
        description: "Виберіть 'Підключитися до Інтернету'.",
      },
      {
        image: "/images/guides/windows7/step6.png",
        description: "Оберіть варіант 'Широкосмугове (PPPoE)'.",
      },
      {
        image: "/images/guides/windows7/step7.png",
        description: "У формі введіть ваш логін і пароль. Поставте галочку 'Запам'ятати цей пароль'. Назву підключення можна залишити без змін. Натисніть 'Підключити'.",
      },
      {
        image: "/images/guides/windows7/step8.png",
        description: "Якщо виникне помилка, натисніть 'Усе одно встановити підключення'.",
      },
      {
        image: "/images/guides/windows7/step9.png",
        description: "Закрийте вікно налаштувань після завершення підключення.",
      },
      {
        image: "/images/guides/windows7/step10.png",
        description: "Для подальшої активації підключення використовуйте іконку 'Мережа' у системному треї.",
      },
    ],
  },
  "windows-10": {
    title: "Налаштування PPPoE підключення у Windows 10",
    description: "Покрокова інструкція для створення підключення PPPoE у Windows 10.",
    steps: [
      {
        image: "/images/guides/windows10/step1.png",
        description: "Правою кнопкою миші натисніть 'Пуск' та виберіть 'Мережеві підключення'.",
        hideStepper: false,
      },
      {
        image: "/images/guides/windows10/step2.png",
        description: "У розділі 'Комутоване з'єднання' натисніть 'Установити нове підключення'.",
      },
      {
        image: "/images/guides/windows10/step3.png",
        description: "У новому вікні оберіть 'Підключитися до Інтернету'.",
      },
      {
        image: "/images/guides/windows10/step4.png",
        description: "Оберіть тип підключення 'Широкосмугове (PPPoE)'.",
      },
      {
        image: "/images/guides/windows10/step5.png",
        description: "У формі введіть логін і пароль. Поставте галочку 'Запам'ятати цей пароль'. Назву підключення можна залишити без змін. Натисніть 'Підключити'.",
      },
      {
        image: "/images/guides/windows10/step6.png",
        description: "Якщо з'явиться помилка, натисніть 'Усе одно встановити підключення'.",
      },
      {
        image: "/images/guides/windows10/step7.png",
        description: "Закрийте вікно налаштувань після завершення підключення.",
      },
      {
        image: "/images/guides/windows10/step8.png",
        description: "У розділі 'Комутоване з'єднання' з'явиться новостворене підключення.",
      },
    ],
  },
  "windows-11": {
    title: "Налаштування PPPoE підключення на Windows 11",
    description: "Покрокова інструкція для створення підключення PPPoE у Windows 11.",
    steps: [
      {
        image: "/images/guides/windows11/step1.png",
        description: "Натисніть правою кнопкою миші на значок мережі на панелі керування.",
      },
      {
        image: "/images/guides/windows11/step2.png",
        description: "Відкрийте налаштування 'Мережа й Інтернет'.",
      },
      {
        image: "/images/guides/windows11/step3.png",
        description: "Виберіть розділ 'Комутоване з'єднання'.",
      },
      {
        image: "/images/guides/windows11/step4.png",
        description: "Натисніть 'Установити нове підключення'.",
      },
      {
        image: "/images/guides/windows11/step5.png",
        description: "Оберіть 'Підключитися до Інтернету' та натисніть 'Далі'.",
      },
      {
        image: "/images/guides/windows11/step6.png",
        description: "Оберіть тип підключення 'Широкосмугове (PPPoE)'.",
      },
      {
        image: "/images/guides/windows11/step7.png",
        description: "Введіть свій логін та пароль від особистого кабінету користувача та натисніть 'Підключити'.",
      },
      {
        image: "/images/guides/windows11/step8.png",
      },
      {
        image: "/images/guides/windows11/step9.png",
        hideStepper: true,
      },
      {
        image: "/images/guides/windows11/step10.png",
        description: "Після підключення, якщо Інтернет недоступний, обов'язково зверніться до технічної підтримки.",
        hideStepper: true,
      },
    ],
  },
};

const guide = computed(() => guides[props.type as keyof typeof guides]);

const visibleSteps = computed(() => {
  let stepNum = 0;
  return (guide.value?.steps ?? []).map((step) => {
    if (!step.hideStepper) stepNum++;
    return { ...step, stepNum: step.hideStepper ? null : stepNum };
  });
});
</script>

<template>
  <UModal class="!max-w-[900px]">
    <template #header>
      <div class="flex items-center gap-4 w-full">
        <div class="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
          <UIcon name="i-heroicons-cog-6-tooth-20-solid" class="w-5 h-5 text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-bold text-slate-900 leading-tight">{{ guide?.title }}</h2>
          <p class="text-sm text-slate-500 mt-0.5">{{ guide?.description }}</p>
        </div>
        <UButton
          icon="line-md:menu-to-close-transition"
          color="neutral"
          variant="ghost"
          size="sm"
          class="shrink-0"
          @click="modal.close()"
        />
      </div>
    </template>

    <template #body>
      <div class="space-y-6 max-h-[70vh] overflow-y-auto px-1 py-2">
        <div
          v-for="(step, index) in visibleSteps"
          :key="index"
          class="bg-slate-50 border border-slate-200 rounded-xl p-5"
        >
          <div v-if="step.stepNum" class="flex items-center gap-2 mb-3">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold">
              {{ step.stepNum }}
            </span>
            <span class="text-sm font-semibold text-slate-900">Крок {{ step.stepNum }}</span>
          </div>

          <img
            v-if="step.image"
            :src="step.image"
            alt="Крок налаштування"
            class="w-full rounded-lg border border-slate-200 shadow-sm mb-3"
          />

          <p v-if="step.description" class="text-sm text-slate-600 leading-relaxed">
            {{ step.description }}
          </p>
        </div>
      </div>
    </template>
  </UModal>
</template>
