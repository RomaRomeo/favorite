<script setup lang="ts">
import type { FormError } from "#ui/types";

const props = defineProps<{
  name: string;
  category: string;
  type: string;
}>();

const toast = useToaster()
const modal = useModal();
const state = reactive({
  name: "",
  settlement: "",
  street: "",
  email: "",
  phone: "",
  comment: "",
});
const loading = ref(false);

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ name: "name", message: "Поле <Ваше ім'я та прізвище> є обовʼязковим" });
  if (!state.phone) errors.push({ name: "phone", message: "Поле <Номер телефону> є обовʼязковим" });
  return errors;
};

async function onSubmit() {
  loading.value = true;
  try {
    await $fetch("https://forminit.com/f/bejrjqda", {
      method: "POST",
      body: { ...state, type: props.type, plan: props.name, category: props.category },
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    });
    toast.success("Дякуємо! Ваша заявка успішно відправлена. Ми зв'яжемося з вами найближчим часом.", "Заявку успішно відправлено!");
    modal.close();
  } catch {
    toast.error("Сталася помилка під час відправки заявки. Будь ласка, спробуйте ще раз або зв'яжіться з нами.", "Помилка відправки!");
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.category,
  (c) => state.settlement = c === 'ходорів' ? 'Ходорів' : '',
  { immediate: true }
);
</script>

<template>
  <UModal>
    <template #header>
      <div class="flex items-center gap-4 w-full">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
          <UIcon name="material-symbols:broadcast-on-personal" class="w-6 h-6 text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-bold text-slate-900 leading-tight">Підключення тарифу</h2>
          <p class="text-sm text-slate-500 mt-0.5">Заповніть форму — ми зв'яжемося з вами</p>
        </div>
        <UButton
          icon="line-md:menu-to-close-transition"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="modal.close()"
          class="shrink-0"
        />
      </div>
    </template>

    <template #body>
      <div class="px-5 pb-6 pt-2">
        <div class="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
          <UIcon name="i-heroicons-check-badge-20-solid" class="w-5 h-5 text-blue-600 shrink-0" />
          <p class="text-sm text-slate-600">
            Тариф: <span class="font-bold text-slate-900">{{ name }}</span>
            <span class="text-slate-400 mx-1">·</span>
            <span class="font-medium text-blue-600 capitalize">{{ category }}</span>
          </p>
        </div>

        <UForm :validate="validate" :state="state" @submit="onSubmit" class="space-y-4">
          <UFormField name="name" label="Ваше ім'я та прізвище" required>
            <UInput v-model="state.name" placeholder="Введіть ваше ім'я та прізвище" variant="outline" size="xl" class="w-full" icon="material-symbols:person-edit-outline-sharp" />
          </UFormField>
          <UFormField name="settlement" label="Назва населеного пункту" required>
            <SelectorSettlements v-model="state.settlement" :mode="props.category === 'ходорів' ? 'only-khodoriv' : 'exclude-khodoriv'" placeholder="Оберіть населений пункт" variant="outline" size="xl" class="w-full" />
          </UFormField>
          <UFormField name="street" required label="Вулиця та номер будинку (квартири)">
            <UInput v-model="state.street" placeholder="Введіть вулицю та номер будинку (квартири)" variant="outline" size="xl" class="w-full" icon="streamline:street-sign" />
          </UFormField>
          <UFormField name="email" label="Електронна пошта" hint="Необов'язкове">
            <UInput v-model="state.email" placeholder="Введіть електронну пошту" variant="outline" size="xl" class="w-full" icon="ic:outline-email" />
          </UFormField>
          <UFormField name="phone" required label="Номер телефону">
            <UInput v-model="state.phone" placeholder="Введіть номер телефону" variant="outline" size="xl" class="w-full" icon="bi:telephone" />
          </UFormField>
          <UFormField name="comment" label="Коментар" hint="Необов'язкове">
            <UTextarea v-model="state.comment" variant="outline" size="xl" class="w-full" />
          </UFormField>

          <div class="pt-2">
            <UButton
              :disabled="!state.name || !state.settlement || !state.street || !state.phone || loading"
              :loading="loading"
              type="submit"
              label="Підключити цей тариф"
              class="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase transition-all duration-200 hover:scale-[1.02]"
              size="xl"
            />
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
