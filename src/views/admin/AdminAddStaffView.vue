<template>
  <v-card class="form-container">
    <h2 class="mb-6">New Staff</h2>
    <v-form
      class="form"
      ref="formRef"
      v-model="isValid"
      @submit.prevent="submitHandler"
    >
      <v-text-field
        label="Name"
        v-model="formData.name"
        :rules="formRules.name"
        outlined
      ></v-text-field>
      <v-text-field
        label="Email"
        v-model="formData.email"
        :rules="formRules.email"
        outlined
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="formData.password"
        :rules="formRules.password"
        type="password"
        outlined
      ></v-text-field>

      <v-container class="form-actions">
        <v-btn
          :color="$vuetify.theme.themes.light.primary"
          class="white--text"
          :loading="addStaffLoading"
          :disabled="addStaffLoading"
          type="submit"
          >submit</v-btn
        >
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      isValid: true,
      formRules: {
        name: [(v) => !!v || "Name is required"],
        email: [(v) => !!v || "Email is required"],
        password: [(v) => !!v || "Password is required"],
      },
    };
  },
  computed: {
    addStaffLoading() {
      return this.$store.getters.addStaffLoading;
    },
  },
  methods: {
    async submitHandler() {
      this.$refs.formRef.validate();
      console.log(this.isValid);
      if (!this.isValid) return;
      console.log("STAFF ", this.formData);
      await this.$store.dispatch("addStaff", this.formData);
      this.$router.push("/admin-home");
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 50rem;
  margin-left: 2rem;
  margin-top: 2rem;
  padding: 1.5rem;
}
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  column-gap: 2rem;
}
.form-actions {
  grid-column: 1/3;
  display: flex;
  justify-content: flex-end;
  padding: 0;
}

@media (max-width: 450px) {
  .form {
    /* grid-template-columns: 1fr; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .form-container {
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
