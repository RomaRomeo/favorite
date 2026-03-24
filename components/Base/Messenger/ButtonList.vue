<script setup lang="ts">
import { siteConfig } from '~/config/site'

const sizes = {
  "sm": "h-6 w-6",
  "lg": "h-10 w-10 md:h-16 md:w-16",
};

const props = withDefaults(
  defineProps<{
    showLabels?: boolean;
    size?: keyof typeof sizes;
  }>(),
  {
    size: "lg",
  },
);

interface MessengerButton {
  name: string;
  link: string;
}

const messengerButtons: MessengerButton[] = [
  { name: "Facebook", link: siteConfig.social.facebook },
  { name: "Viber", link: siteConfig.social.viber },
  { name: "Telegram", link: siteConfig.social.telegram },
];
</script>

<template>
  <div class="flex">
    <a
    v-for="button in messengerButtons"
    :key="button.name"
    :href="button.link"
    target="_blank"
    rel="noopener noreferrer"
    class="flex flex-col items-center space-y-4 transition-transform hover:scale-105"
  >
    <!-- Adjust the following logic related to icon shadows -->
    <div
        :class="[sizes[props.size], { 'h-16 w-16 md:h-24 md:w-24': props.size === 'lg' } ]" 
        class="flex items-center justify-center bg-gradient-to-r from-[#f2f8fa] to-[#f0fbff] rounded-full shadow-lg hover:shadow-xl transition duration-300"
    >
      <BaseIconSocialFacebook
        v-if="button.name === 'Facebook'"
        :class="sizes[props.size]"
        class="text-[#0966ff]"
      />
      <BaseIconSocialViber
        v-if="button.name === 'Viber'"
        :class="sizes[props.size]"
        class="text-[#675da9]"
      />
      <BaseIconSocialTelegram
        v-if="button.name === 'Telegram'"
        :class="sizes[props.size]"
        class="text-[#1E96C8]"
      />
    </div>
    <span
        v-if="props.showLabels"
        class="text-md md:text-lg font-medium text-gray-700 group-hover:text-gray-900 transition duration-300"
    >
      {{ button.name }}
    </span>
  </a>
  </div>
  
</template>
