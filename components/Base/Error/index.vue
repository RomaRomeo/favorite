<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const goBack = () => typeof route.query.from === 'string' ? router.push(route.query.from) : router.back();
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="flex items-center min-h-screen">
    <div class="flex flex-col items-center max-w-sm mx-auto text-center">
      <p class="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
        <UIcon name="ion:ios-warning" class="w-16 h-16" />
      </p>
      <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
        Сторінка не знайдена
      </h1>
      <p class="mt-4 text-gray-500">
        Сторінка, яку ви шукаєте, не існує. Ось кілька корисних посилань:
      </p>

      <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
        <UButton
          label="Назад"
          icon="ion:return-up-back-outline"
          color="neutral"
          variant="outline"
          @click="goBack()"
        />
        <UButton
          label="На головну"
          icon="material-symbols:in-home-mode-outline-rounded"
          color="secondary"
          variant="solid"
          @click="handleError()"
        />
      </div>
    </div>
  </div>
</template>
