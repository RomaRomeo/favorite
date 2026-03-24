<script setup lang="ts">
const props = defineProps<{
  type: string;
}>();

const modal = useModal();

const guides = {
  "tp-link": {
    title: "Налаштування роутера TP-Link WR841N",
    description: "Підключення, вхід у панель керування, налаштування інтернету та безпеки мережі.",
    steps: [
      {
        hideStepper: false,
        image: "/images/guides/tp-link-wr841n/step1.png",
        description: "Підключити кабель від провайдера в синій порт, а локальні підлючення (комп'ютер, інші пристрої) у жовті.",
      },
      {
        image: "/images/guides/tp-link-wr841n/step2.png",
        description: "У браузері відкрити адресу 192.168.1.1. Для входу в систему налаштувань ввести користувача admin і пароль admin. Зліва в меню обрати Мережа WAN, потім Тип підключення WAN вказати PPPoE.",
      },
      {
        image: "/images/guides/tp-link-wr841n/step3.png",
        description: "Потім ввести Ім'я користувача (логін) та Пароль для підключення до інтернету, надані провайдером, і знову Підтвердити пароль. Натиснути Зберегти.",
      },
      {
        image: "/images/guides/tp-link-wr841n/step4.png",
        description: "В меню Безпровідний режим вказати Назву мережі. Цю назву буде видно на мобільних пристроях при пошуку Wi-Fi мережі. Регіон можна вказати Україна. Натиснути Зберегти.",
      },
      {
        image: "/images/guides/tp-link-wr841n/step5.png",
        description: "Потім у підменю Захист безпровідного режиму вибрати пункт WPA/WPA2 - Personal та вписати Пароль безпровідної мережі. Натиснути Зберегти.",
      },
      {
        image: "/images/guides/tp-link-wr841n/step6.png",
        description: "У підменю Розширені налаштування можна встановити Потужність передавача в залежності від бажаного покриття. Рекомендовано встановлювати мінімально необхідну, щоб не створювати завад для інших пристроїв. Натиснути Зберегти.",
      },
      {
        image: "/images/guides/tp-link-wr841n/step7.png",
        description: "Для задіяння змін, відкрити меню Системні інструменти, підменю Перезавантаження, та Перезавантажити пристрій. Протягом хвилини пристрій запуститься з новою конфігурацією.",
      },
    ],
  },
  "netis": {
    title: "Налаштування роутера Netis WF2411",
    description: "Підключення, вхід у веб-інтерфейс, налаштування інтернету та Wi-Fi.",
    steps: [
      {
        hideStepper: false,
        image: "/images/guides/netis-wf2411/step1.png",
        description: "Підключити кабель від провайдера в синій порт, а локальні підлючення (комп'ютер, інші пристрої) у чорні.",
      },
      {
        image: "/images/guides/netis-wf2411/step2.png",
        description: "У браузері відкрити адресу 192.168.1.1. Відкриється інтерфейс для налаштувань. Зверху на сторінці можна обрати мову. Потім необхідно вибрати тип підключення PPPoE. Ввести логін та пароль для підлючення до інтернету, надані провайдером. Потім вказати назву Wi-Fi мережі, активувати її, а також встановити пароль на підключення до цієї Wi-Fi мережі. Натиснути Зберегти.",
      },
      {
        image: "/images/guides/netis-wf2411/step3.png",
      },
      {
        image: "/images/guides/netis-wf2411/step4.png",
        hideStepper: true,
        description: "В додаткових налаштуваннях (верхня права кнопка), можна змінити потужність радіопередавача. Рекомендовано встановлювати мінімально необхідну, щоб не створювати завад для інших пристроїв. Також можна встановити пароль на підключення до роутера та інше.",
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
          <UIcon name="i-heroicons-wifi-20-solid" class="w-5 h-5 text-white" />
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
