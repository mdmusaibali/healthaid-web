<template>
  <div class="login-view">
    <v-card class="pa-6">
      <form @submit.prevent="submitHandler">
        <v-img
          src="@/assets/img/logo512.png"
          height="120"
          width="120"
          class="logo"
        ></v-img>
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
          class="white--text"
          :loading="isLoginLoading"
          :disabled="isLoginLoading"
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
        email: "pop@gmail.com",
        password: "5748",
      },
    };
  },
  mounted() {
    const token = getSession();
    if (token) {
      this.$store.commit("login", {
        authToken: token,
        message: "Welcome back",
      });
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
    isLoginLoading() {
      return this.$store.getters.loginLoading;
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

<style scoped>
.login-view {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input {
  width: 20rem;
}
.logo {
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>
