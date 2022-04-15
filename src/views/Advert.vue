<template>
  <div>
    <PostForm class="ma-10" @form-data="createPost" />
    <div v-for="post in allAdverts" :key="post.id" class="ma-10">
      <v-card elevation="5">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>{{ post.overview }}</v-card-text>
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
import PostForm from "@/components/app/PostForm";

export default {
  name: "Advert",
  components: {
    PostForm,
  },
  data: () => ({
    drawer: false,
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
  },
};
</script>

<style scoped></style>
