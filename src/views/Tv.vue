<template>
  <div>
    <v-tabs v-model="tabs" fixed-tabs>
      <v-tab href="#cable" class="primary--text">
        <h2>КАБЕЛЬНЕ</h2>
      </v-tab>

      <v-tab href="#digital" class="primary--text">
        <h2>ЦИФРОВЕ</h2>
      </v-tab>
    </v-tabs>

    <template>
      <h2 class="mt-5 d-flex justify-center">Тарифні плани</h2>
      <v-row class="mt-5 d-flex justify-center" v-if="tabs === 'cable'">
        <v-col v-for="(item, i) in getActiveTvPlan" :key="i" cols="3">
          <v-card class="mx-auto" max-width="400" height="400">
            <v-img
              class="white--text align-end"
              height="400px"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
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
                  {{ item.channels }}
                  каналів
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
  </div>
</template>

<script>
import plans from "../assets/utils/plans";

export default {
  name: "Tv",
  data() {
    return {
      tabs: "",
    };
  },
  computed: {
    getActiveTvPlan() {
      return plans.tvPlans;
    },
  },
};
</script>

<style scoped></style>
