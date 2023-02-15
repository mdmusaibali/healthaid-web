<template>
  <div class="login-view">
    <v-card class="pa-6">
      <form @submit.prevent="submitHandler">
        <p class="text-h4 pb-2">Login</p>
        <v-text-field
          label="Email"
          v-model.trim="formInputs.email"
          outlined
          class="input"
          type="email"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model.trim="formInputs.password"
          outlined
          class="input"
        ></v-text-field>
        <v-btn
          :color="$vuetify.theme.themes.light.primary"
          @click="submitHandler"
          >Login</v-btn
        >
      </form>
    </v-card>
  </div>
</template>

<script>
import { getSession } from "./../utils/session";
export default {
  data() {
    return {
      formInputs: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    const token = getSession();
    if (token) {
      this.$store.commit("login", { authToken: token });
    }
    if (this.isLoggedIn) {
      this.$router.push("/home");
    }
  },
  watch: {
    isLoggedIn(newV) {
      if (newV) {
        this.$router.push("/home");
      }
    },
  },
  computed: {
    isValid() {
      return this.formInputs.email !== "" && this.formInputs.password !== "";
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    submitHandler() {
      if (!this.isValid)
        return this.$store.commit("openDialog", {
          text: "Please fill all input fields.",
        });

      this.$store.dispatch("login", {
        email: this.formInputs.email,
        password: this.formInputs.password,
      });
    },
  },
};
</script>

<style>
.login-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input {
  width: 20rem;
}
</style>
