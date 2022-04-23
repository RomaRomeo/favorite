<template>
  <div class="auth-container">
    <div v-if="true">
      <ModalCreatePost
        :open="openModal"
        @close="toogleModal"
        @form-data="createPost"
      />
      <v-btn
        class="mx-2"
        style="position: relative; left: 89%; margin-top: 40px"
        fab
        dark
        color="indigo"
        @click.stop="toogleModal"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </div>
    <div v-for="post in allAdverts" :key="post.id" class="ma-10">
      <v-card elevation="5">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>{{ post.overview || post.body }}</v-card-text>
        <v-img
          class="white--text align-end"
          height="300"
          :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2${post.poster_path}`"
        >
        </v-img>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ModalCreatePost from "@/components/app/modals/ModalCreatePost";

export default {
  name: "Advert",
  components: {
    ModalCreatePost,
  },
  data: () => ({
    openModal: false,
  }),
  mounted() {
    this.fetchAdverts();
  },
  computed: {
    ...mapGetters({ allAdverts: "allAdverts" }),
  },
  methods: {
    ...mapActions({ fetchAdverts: "fetchAdverts" }),
    ...mapMutations({ createAdvert: "createAdvert" }),

    createPost(data) {
      this.createAdvert(data);
    },
    toogleModal() {
      this.openModal = !this.openModal;
    }
  },
};
</script>

<style scoped></style>
