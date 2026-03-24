<script setup lang="ts">
type Link = { label: string; url?: string };
type Section = { title: string; links: Link[] };

const props = defineProps<{
  sections: Section[];
}>()
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-8">
    <div v-for="(section, index) in sections" :key="index">
      <h3 class="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">
        {{ section.title }}
      </h3>
      <ul class="space-y-2.5">
        <li v-for="(link, i) in section.links" :key="i">
          <NuxtLink
            v-if="link.url"
            :to="link.url"
            class="text-sm text-slate-400 hover:text-white transition-colors duration-200"
          >
            {{ link.label }}
          </NuxtLink>
          <span v-else class="text-sm text-slate-400">
            {{ link.label }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
