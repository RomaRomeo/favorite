<template>
  <div>
    <v-carousel height="800" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="slide in slides" :key="slide.id">
        <v-card>
          <v-img class="white--text align-center" :src="slide.src" height="800">
            <div class="carousel-img d-flex justify-center align-center flex-column">
              <v-card-title class="text-h4 d-flex justify-center" style=" z-index: 1;">
                {{ getSlideTitle(slide.id) }}
              </v-card-title>
              <v-card-actions class="d-flex justify-center">
                <v-btn depressed color="red" class="btn-red red"> Детальніше </v-btn>
              </v-card-actions>
            </div>
          </v-img>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Carousel",
  data() {
    return {
      slides: [
        {
          id: 1,
          title: "оголошення",
          src: require("@/assets/img/pexels-picjumbocom-461077.jpg"),
        },
        {
          id: 2,
          title: "акції",
          src: require("@/assets/img/pexels-marcus-aurelius-6787960.jpg"),
        },
        {
          id: 3,
          title: "оплата",
          src: require("@/assets/img/pexels-karolina-grabowska-4968391.jpg"),
        },
      ],
    };
  },
  mounted() {
    this.fetchAdverts();
  },
  computed: {
    ...mapGetters({ allAdverts: "allAdverts" }),
  },
  methods: {
    ...mapActions({
      fetchAdverts: "fetchAdverts",
    }),

    getSlideTitle(id) {
      const lastAdvertTitle =
        this.allAdverts[0] !== undefined
          ? this.allAdverts[0].title
          : "Оголошення";
      const lastPromotions =
        this.allAdverts[1] !== undefined ? this.allAdverts[1].title : "Акції";
      const paiment = "Оплата";

      switch (id) {
        case 1:
          return lastAdvertTitle;
        case 2:
          return lastPromotions;
        case 3:
          return paiment;
      }
    }
  },
};
</script>

<style lang="scss">
  .carousel-img {
    position: relative;
    height: 400px;
    width: 50%;
    &:before {
      position: absolute;
      content: '';
      height: 100%;
      width: 100%;
      opacity: 0.4;
      background-color: #0091EA;
    }
    .btn-red {
      width: 200px;
      border-radius: 25px;
      color: white;
    }
  }
</style>
