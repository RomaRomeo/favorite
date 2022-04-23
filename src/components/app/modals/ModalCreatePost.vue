<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="800" persistent>
      <v-card>
        <PostForm @form-data="createPost" @close="close" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PostForm from "@/components/app/PostForm";

export default {
  name: "ModalCreatePost",
  components: { PostForm },
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    open: {
      handler(val) {
        this.dialog = val;
      },
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit("close");
    },
    createPost(data) {
      this.$emit("form-data", data);
    },
  },
};
</script>

<style scoped></style>
