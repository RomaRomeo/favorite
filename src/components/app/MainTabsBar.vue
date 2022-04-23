<template>
  <v-item-group class="auth-container">
    <div class="d-flex">
      <v-col v-for="slide in slides" :key="slide.id" style="padding: 0">
        <v-item>
          <v-card
            color="#E1F5FE"
            class="d-flex justify-center align-center"
            elevation="0"
            height="150"
            ripple
          >
            <v-card-title>
              {{ slide.title }}
            </v-card-title>
              <v-icon>{{ slide.src }}</v-icon>
          </v-card>
        </v-item>
      </v-col>
    </div>
  </v-item-group>
</template>

<script>
    import { mdiCellphoneBasic, mdiCreditCardCheck, mdiWifi, mdiHomeAccount } from "@mdi/js";

    export default {
  name: "MainTabsBar",
  data() {
    return {
      slides: [
        { id: 1, title: "мій кабінет", src: mdiHomeAccount },
        { id: 2, title: "інтернет", src: mdiWifi },
        { id: 3, title: "оплата", src: mdiCreditCardCheck },
        { id: 4, title: "центр підтримки", src: mdiCellphoneBasic },
      ],
    };
  },
};
</script>

<style scoped></style>
