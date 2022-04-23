<template>
  <div>
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
    <div v-for="post in allPromotions" :key="post.id" class="ma-10">
      <v-card elevation="5">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>{{ post.body }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ModalCreatePost from "@/components/app/modals/ModalCreatePost";

export default {
  name: "Promotions",
  components: {
    ModalCreatePost,
  },
  data: () => ({
    openModal: false,
  }),
  mounted() {
    this.fetchPromotions();
  },
  computed: {
    ...mapGetters({ allPromotions: "allPromotions" }),
  },
  methods: {
    ...mapActions({ fetchPromotions: "fetchPromotions" }),
    ...mapMutations({ createPromotions: "createPromotions" }),

    createPost(data) {
      this.createPromotions(data);
    },
    toogleModal() {
      this.openModal = !this.openModal;
    },
  },
};
</script>

<style scoped></style>
