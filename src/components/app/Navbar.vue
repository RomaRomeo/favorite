<template>
  <div>
    <v-toolbar color="#90CAF9" height="120" style="position: fixed; z-index: 10; top: 0; right: 0; left: 0">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-tabs color="#0D47A1" v-if="!$vuetify.breakpoint.smAndDown" centered>
        <v-tab
          v-for="link in links"
          :key="link.url"
          :to="link.url"
        >
          {{ link.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary overlay-color="#90CAF9" disable-route-watcher style="z-index: 11;">
      <v-list nav dense>
        <v-list-item-group active-class="blue lighten-4">
          <v-list-item
            v-for="link in links"
            :key="link.url"
            :to="link.url"
          >
            <v-list-item-title class="text-uppercase">{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    links: [
      { title: "Головна", url: "/" },
      { title: "Інтернет", url: "/internet" },
      { title: "Телебачення", url: "/tv" },
      { title: "Оголошення", url: "/advert" },
      { title: "Пропозиції", url: "/promotions" },
      { title: "Оплата", url: "/payment" },
      { title: "Підтримка", url: "/support" },
      { title: "Компанія", url: "/about" },
    ],
    drawer: false
  })
};
</script>

<style scoped></style>
