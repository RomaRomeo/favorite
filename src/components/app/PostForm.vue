<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>Створити новий пост</h2>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <form>
            <v-text-field
              v-model="title"
              label="Назва посту"
              required
              :error-messages="titleErrors"
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="overview"
              label="Деталі посту"
              required
              :error-messages="overviewErrors"
              @input="$v.overview.$touch()"
              @blur="$v.overview.$touch()"
            ></v-text-field>
            <v-btn
              depressed
              class="mt-15 mr-5"
              color="red"
              :disabled="!canCreatePost"
              @click="submit"
            >
              Створити
            </v-btn>
            <v-btn
              depressed
              class="mt-15"
              :disabled="!title && !overview"
              @click="clear"
            >
              Очисити
            </v-btn>
          </form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    overview: {
      required,
      minLength: minLength(10),
    },
  },
  props: {},
  data() {
    return {
      title: "",
      overview: "",
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
    overviewErrors() {
      const errors = [];
      if (!this.$v.overview.$dirty) return errors;
      !this.$v.overview.minLength &&
        errors.push("Опис має містити більше 10 символів.");
      !this.$v.overview.required && errors.push("Укажіть опис.");
      return errors;
    },
    canCreatePost() {
      return (
        !this.titleErrors.length &&
        !this.overviewErrors.length &&
        this.title &&
        this.overview
      );
    },
  },
  methods: {
    submit() {
      const data = {
        title: this.title,
        overview: this.overview,
        id: Date.now(),
      };

      if (this.canCreatePost) {
        this.$emit("form-data", data);

        this.$v.$reset();
        this.title = "";
        this.overview = "";
      }
    },
    clear() {
      this.$v.$reset();
      this.title = "";
      this.overview = "";
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
