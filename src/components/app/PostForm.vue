<template>
  <div>
    <v-btn style="position: absolute; right: 0" icon @click="$emit('close')">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <form class="pa-10">
      <h2>Створити новий пост</h2>
      <v-text-field
        v-model="title"
        label="Назва посту"
        required
        :error-messages="titleErrors"
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>
      <v-textarea
        v-model="body"
        filled
        label="Деталі посту"
        required
        :error-messages="bodyErrors"
        @input="$v.body.$touch()"
        @blur="$v.body.$touch()"
      ></v-textarea>
      <v-btn
        class="mt-15 mr-5"
        color="red"
        :disabled="!canCreatePost"
        @click="submit"
      >
        Створити
      </v-btn>
      <v-btn class="mt-15" :disabled="!title && !body" @click="clear">
        Очисити
      </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "PostForm",
  mixins: [validationMixin],
  validations: {
    title: {
      required,
      minLength: minLength(5),
    },
    body: {
      required,
      minLength: minLength(10),
    },
  },
  props: {},
  data() {
    return {
      title: "",
      body: "",
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.minLength &&
        errors.push("Заголовок має містити більше 5 символів.");
      !this.$v.title.required && errors.push("Укажіть заголовок.");
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.body.$dirty) return errors;
      !this.$v.body.minLength &&
        errors.push("Опис має містити більше 10 символів.");
      !this.$v.body.required && errors.push("Укажіть опис.");
      return errors;
    },
    canCreatePost() {
      return Boolean(
        !this.titleErrors.length &&
          !this.bodyErrors.length &&
          this.title &&
          this.body
      );
    },
  },
  methods: {
    submit() {
      const data = {
        title: this.title,
        body: this.body,
        id: Date.now(),
      };

      if (this.canCreatePost) {
        this.$emit("form-data", data);
        this.$emit("close");

        this.$v.$reset();
        this.title = "";
        this.body = "";
      }
    },
    clear() {
      this.$v.$reset();
      this.title = "";
      this.body = "";
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 50%;
  border: 1px solid red;
  border-radius: 2px;
  padding: 10px;
}
</style>
