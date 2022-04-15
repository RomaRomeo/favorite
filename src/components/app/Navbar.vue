<template>
  <div>
    <v-toolbar
      color="#90CAF9"
      height="120"
      max-height="120"
      style="position: fixed; z-index: 10; top: 0; right: 0; left: 0"
      class="d-flex justify-center"
    >
      <div
        class="d-flex justify-space-between align-center"
        style="width: 100%; height: 100%; max-width: 1200px"
      >
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.smAndDown"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-tabs color="#0D47A1" v-if="!$vuetify.breakpoint.smAndDown" centered>
          <v-tab v-for="link in links" :key="link.url" :to="link.url">
            {{ link.title }}
          </v-tab>
        </v-tabs>

        <v-btn
                depressed
                color="primary"
                @click="open"
        >
          Мій кабінет
        </v-btn>
      </div>
      <v-app-bar-nav-icon class="ml-15">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in menuItems" :key="i" link @click="redirect(item.url)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon>{{ icons.mdiAccount }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      overlay-color="#90CAF9"
      disable-route-watcher
      style="z-index: 11"
    >
      <v-list nav dense>
        <v-list-item-group active-class="blue lighten-4">
          <v-list-item v-for="link in links" :key="link.url" :to="link.url">
            <v-list-item-title class="text-uppercase">
              {{ link.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-btn
                depressed
                class="mt-15"
                color="primary"
                @click="open"
        >
          Мій кабінет
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";

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
    menuItems: [
      { title: 'Увійти як адмін', url: '/profile' }
    ],
    drawer: false,
    icons: { mdiAccount },
  }),
  methods: {
    redirect (path) {
      this.$router.push({ path })
    },
    open() {
      window.open('http://my.favorite.lviv.ua/', '_blank')
    }
  }
};
</script>

<style lang="scss">
.v-toolbar__content {
  width: 100% !important;
  display: flex;
  justify-content: center;
  .v-tabs {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .v-tabs-bar {
      background-color: unset !important;
    }
    .v-item-group {
      height: 100%;
    }
  }
}
</style>
