<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="ma-10">
      <v-card elevation="5">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>{{ post.overview }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Advert",
  data: () => ({
    drawer: false,
    posts: [],
    apiKey: "ef817d509d5dbf9ce8b44c73e7bb30b4",
  }),
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&page=12`
        )
        .then((response) => {
          this.posts = response.data.results;
          console.log("Posts successfully received", this.posts);
        })
        .catch((error) => {
          console.warn("Error while fetching posts", error);
        });
    },
  },
};
</script>

<style scoped></style>
