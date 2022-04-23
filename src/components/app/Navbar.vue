<template>
  <div class="nav">
    <v-toolbar
      height="120"
      max-height="120"
      style="position: fixed; z-index: 10; top: 0; right: 0; left: 0"
      class="d-flex justify-center"
      color="#0091EA"
    >
      <div
        class="d-flex justify-space-between align-center"
        style="height: 100%"
      >
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.mdAndDown"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-tabs color="white" v-if="!$vuetify.breakpoint.mdAndDown" centered>
          <v-tab
            v-for="link in links"
            :key="link.url"
            :to="link.url"
            style="font-size: 21px"
          >
            {{ link.title }}
          </v-tab>
        </v-tabs>
        <div class="mr-10">
          <v-btn depressed color="white" class="btn-home" @click="open">
            Мій кабінет
          </v-btn>
        </div>
        <v-app-bar-nav-icon>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in menuItems"
                :key="i"
                link
                @click="redirect(item.url)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>{{ icons.mdiAccount }}</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar-nav-icon>
      </div>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      overlay-color="#90CAF9"
      disable-route-watcher
      style="z-index: 11; position: fixed"
    >
      <v-list nav dense style="padding: 0">
        <v-list-item-group active-class="light-blue accent-4" color="white">
          <v-list-item v-for="link in links" :key="link.url" :to="link.url" class="pl-5">
            <v-list-item-title class="text-uppercase">
              {{ link.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <div class="d-flex justify-center">
          <v-btn depressed class="mt-15 btn-home-nav" color="#0091ea" @click="open">
            Мій кабінет
          </v-btn>
        </div>
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
      { title: "Новини", url: "/advert" },
      { title: "Інтернет", url: "/internet" },
      { title: "Телебачення", url: "/tv" },
      { title: "Оплата", url: "/payment" },
      { title: "Підтримка", url: "/support" },
      { title: "Компанія", url: "/about" },
    ],
    menuItems: [{ title: "Увійти як адмін", url: "/profile" }],
    drawer: false,
    icons: { mdiAccount },
  }),
  methods: {
    redirect(path) {
      this.$router.push({ path });
    },
    open() {
      window.open("http://my.favorite.lviv.ua/", "_blank");
    },
  },
};
</script>

<style lang="scss">
.nav {
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
    .btn-home {
      border-radius: 30px;
      padding: 30px;
      .v-btn__content {
        font-size: 21px;
        padding: 23px;
        color: #0091ea;
      }
    }
  }

  .v-list--nav .v-list-item {
    border-radius: unset !important;
  }
  .btn-home-nav {
    width: 200px;
    border-radius: 30px;
    .v-btn__content {
      font-size: 18px;
      color: white;
    }
  }
}

</style>
