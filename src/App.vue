<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import EmptyLayout from '@/layouts/EmptyLayout';

export default {
  components: {
    MainLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
};
</script>
