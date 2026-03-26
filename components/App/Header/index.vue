<script setup lang="ts">
import { siteConfig } from '~/config/site'

const route = useRoute()

const navItems = [
  { label: "Головна", to: "/" },
  { label: "Оголошення", to: "/news" },
  { label: "Акції", to: "/promo" },
  { label: "Інтернет", to: "/internet" },
  {
    label: "Телебачення",
    children: [
      { label: "IP TV (Sweet TV)", icon: "i-heroicons-tv-20-solid", description: "Цифрове телебачення.", to: "/tv/ip" },
      { label: "Кабельне ТБ", icon: "i-heroicons-signal-20-solid", description: "Кабельне телебачення.", to: "/tv/cable" },
    ],
  },
  { label: "Оплата", to: "/payment" },
  {
    label: "Налаштування",
    children: [
      { label: "Windows", icon: "i-heroicons-computer-desktop-20-solid", description: "Налаштування PPPoE.", to: "/config/windows" },
      { label: "Роутери", icon: "i-heroicons-wifi-20-solid", description: "Налаштування роутерів.", to: "/config/routers" },
    ],
  },
  { label: "FAQ", to: "/faq" },
  { label: "Контакти", to: "/contact" },
]

const items = ref([navItems])

const mobileExpanded = ref<string | null>(null)

function toggleMobileSub(label: string) {
  mobileExpanded.value = mobileExpanded.value === label ? null : label
}

function isActive(to?: string) {
  if (!to) return false
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<template>
  <BaseHeader>
    <template #logo>
      <NuxtLink to="/" class="inline-flex shrink-0">
        <img
          src="/images/logo/logo_dark.png"
          class="block h-auto w-[min(200px,calc(100vw-5.5rem))] max-h-[3.5rem] shrink-0 object-contain object-left lg:w-[200px] lg:max-h-none"
          width="200"
          height="48"
          aria-label="Favorite logo"
          alt="Favorite logo"
        />
      </NuxtLink>
    </template>

    <template #center>
      <UNavigationMenu :items="items" color="neutral" variant="link" />
    </template>

    <template #right>
      <UButton
        label="Особистий кабінет"
        :to="siteConfig.personalCabinet"
        target="_blank"
        icon="line-md:account"
        color="neutral"
        variant="outline"
        size="sm"
        class="font-medium"
      />
    </template>

    <template #panel>
      <nav class="flex flex-col gap-0.5">
        <template v-for="item in navItems" :key="item.label">
          <!-- Simple link -->
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium transition-colors active:bg-slate-100"
            :class="isActive(item.to) ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- Expandable group -->
          <div v-else>
            <button
              class="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-[15px] font-medium transition-colors active:bg-slate-100 cursor-pointer"
              :class="mobileExpanded === item.label ? 'text-slate-900 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'"
              @click="toggleMobileSub(item.label)"
            >
              {{ item.label }}
              <UIcon
                name="i-heroicons-chevron-down-20-solid"
                class="w-4 h-4 text-slate-400 transition-transform duration-200"
                :class="mobileExpanded === item.label ? 'rotate-180' : ''"
              />
            </button>

            <div
              v-show="mobileExpanded === item.label"
              class="ml-3 pl-3 mt-0.5 mb-1 border-l-2 border-slate-200 space-y-0.5"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors active:bg-slate-100"
                :class="isActive(child.to) ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'"
              >
                <UIcon :name="child.icon" class="w-4 h-4 shrink-0" :class="isActive(child.to) ? 'text-blue-600' : 'text-slate-400'" />
                <div>
                  <span class="font-medium">{{ child.label }}</span>
                  <p v-if="child.description" class="text-xs text-slate-400 mt-0.5">{{ child.description }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>

        <!-- Mobile cabinet button -->
        <div class="mt-3 pt-3 border-t border-slate-200">
          <UButton
            label="Особистий кабінет"
            :to="siteConfig.personalCabinet"
            target="_blank"
            icon="line-md:account"
            color="primary"
            variant="soft"
            size="md"
            class="w-full justify-center"
          />
        </div>
      </nav>
    </template>
  </BaseHeader>
</template>
