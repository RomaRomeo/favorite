<template>
  <div>
    <v-tabs v-model="tabs" fixed-tabs>
      <v-tab href="#khodoriv" class="primary--text">
        <h2>ХОДОРІВ</h2>
      </v-tab>

      <v-tab href="#other" class="primary--text">
        <h2>РАЙОН</h2>
      </v-tab>
    </v-tabs>

    <template>
      <h2 class="mt-5 d-flex justify-center">Тарифні плани</h2>
      <v-row class="mt-5 d-flex justify-center">
        <v-col v-for="(item, i) in getActivePlan" :key="i" cols="3">
          <v-card class="mx-auto" max-width="400" height="400">
            <v-img
              class="white--text align-end"
              height="400px"
              src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
            >
              <v-card-title class="text-h4 mb-16 d-flex justify-center"
                >"{{ item.name }}"</v-card-title
              >
              <v-card-subtitle class="pb-0 text-h5 d-flex justify-center">
                {{ item.price }}
                грн/міс
              </v-card-subtitle>

              <v-card-text class="text--white d-flex justify-center mb-16">
                <div>
                  {{ item.speed }}
                  Мбіт/с
                </div>
              </v-card-text>

              <v-card-actions class="d-flex justify-center">
                <v-btn color="red" text> Підключити </v-btn>
              </v-card-actions>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <div v-if="tabs === 'other'" class="mt-5">
      <v-list-item-title class="text-h5"
        >Інтернет покриття доступне у населених пунктах</v-list-item-title
      >

      <div
        v-for="(item, i) in getArea"
        :key="i"
        class="d-flex justify-space-between flex-wrap"
      >
        <v-chip
          class="ma-2 d-flex justify-center"
          color="pink"
          label
          text-color="white"
          style="width: 130px"
        >
          {{ item }}
        </v-chip>
      </div>

      <div class="mt-5">
        <ul>
          <h3 class="mb-1">Примітки</h3>
          <li>Усі послуги надаються при наявності технічної можливості.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import plans from "../assets/utils/plans";

export default {
  name: "Internet",
  data() {
    return {
      tabs: "",
    };
  },
  computed: {
    getActivePlan() {
      return this.tabs === "khodoriv" ? plans.khodorivPlans : plans.otherPlans;
    },
    getArea() {
      return plans.availableArea;
    },
  },
};
</script>

<style scoped></style>
