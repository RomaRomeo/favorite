<template>
  <div style="position: relative; max-width: 600px; margin: 0 auto; top: 30%">
    <v-btn style="position: absolute; right: 0" icon @click="back">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <form style="background-color: white" class="pa-10">
      <h2>Кабінет адміністратора</h2>
      <v-text-field
        v-model="adminData.login"
        :error-messages="loginErrors"
        :counter="10"
        label="Логін"
        required
        @input="$v.adminData.login.$touch()"
        @blur="$v.adminData.login.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="adminData.password"
        :error-messages="passwordErrors"
        label="Пароль"
        type="password"
        required
        @input="$v.adminData.password.$touch()"
        @blur="$v.adminData.password.$touch()"
      ></v-text-field>
      <div class="d-flex mt-15">
        <v-btn class="mr-5" color="red" @click="submit" :disabled="!canLogin">
          Увійти
        </v-btn>
        <v-btn
          :disabled="!adminData.login && !adminData.password"
          @click="clear"
          >Очисити</v-btn
        >
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Profile",
  mixins: [validationMixin],
  validations: {
    adminData: {
      login: { required, maxLength: maxLength(10), log: 1122 },
      password: { required, maxLength: maxLength(10) },
    },
  },

  data: () => ({
    adminData: {
      login: "",
      password: "",
    },
  }),

  computed: {
    loginErrors() {
      const errors = [];
      if (!this.$v.adminData.login.$dirty) return errors;
      !this.$v.adminData.login.maxLength &&
        errors.push("Логін має містити не більше 10 символів.");
      !this.$v.adminData.login.required && errors.push("Укажіть логін.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.adminData.password.$dirty) return errors;
      !this.$v.adminData.password.maxLength &&
        errors.push("Паорль має містити не більше 10 символів.");
      !this.$v.adminData.password.required && errors.push("Укажіть пароль.");
      return errors;
    },
    canLogin() {
      return Boolean(
        !this.loginErrors.length &&
          !this.passwordErrors.length &&
          this.adminData.login &&
          this.adminData.password
      );
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.adminData.login == 1122 && this.adminData.password == 1122) {
        this.$router.push({ path: "/" });
      }
    },
    clear() {
      this.$v.$reset();
      this.adminData.login = "";
      this.adminData.password = "";
    },
    back() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped></style>
