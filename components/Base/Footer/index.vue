<template>
  <footer class="bg-slate-900 text-slate-300">
    <div class="container mx-auto px-6 pt-12 pb-8">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8">
        <div class="lg:col-span-2">
          <slot name="left" />
        </div>

        <div class="lg:col-span-3">
          <slot name="middle" />
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-slate-500">
          © {{ new Date().getFullYear() }} Фаворит ТВ/НЕТ — Усі права захищені
        </p>
        <p class="text-xs text-slate-600">
          м. Ходорів, Львівська область
        </p>
      </div>
    </div>
  </footer>
</template>
