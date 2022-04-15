<template>
  <div>
    <v-carousel
      cycle
      height="500"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="slide in slides" :key="slide.id">
        <v-sheet :color="slide.bg" height="100%">
          <v-row class="fill-height d-flex flex-column" align="center" justify="center">
            <div class="text-h5">{{ slide.title.toUpperCase() }}</div>
            <div class="text-h3 pa-10">{{ getSlideTitle(slide.id) }}</div>
            <v-btn depressed color="red">
              Деталі
            </v-btn>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      slides: [
        { id: 1, bg: "indigo", title: "оголошення" },
        { id: 2, bg: "warning", title: "акції" },
        { id: 3, bg: "pink darken-2", title: "оплата" },
      ],
    };
  },
  mounted() {
    this.fetchAdverts();
    this.fetchPromotions();
  },
  computed: {
    ...mapGetters({ allAdverts: "allAdverts",  allPromotions: 'allPromotions' }),
  },
  methods: {
    ...mapActions({ fetchAdverts: "fetchAdverts", fetchPromotions: "fetchPromotions" }),

    getSlideTitle (id) {
      const lastAdvertTitle = this.allAdverts[0] !== undefined ? this.allAdverts[0].title : "Оголошення"
      const lastPromotions = this.allPromotions[0] !== undefined ? this.allPromotions[0].title : "Акції"
      const paiment = 'Оплата'

      switch (id) {
        case 1:
          return lastAdvertTitle
        case 2:
          return lastPromotions
        case 3:
          return paiment
      }
    },
  },
};
</script>

<style scoped></style>
