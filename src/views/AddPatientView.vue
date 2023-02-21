<template>
  <v-card class="form-container">
    <h2 class="mb-6">New Patient</h2>
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
        label="Address"
        v-model="formData.address"
        :rules="formRules.address"
        outlined
      ></v-text-field>
      <v-text-field
        label="Date of birth"
        v-model="formData.date_of_birth"
        :rules="formRules.date_of_birth"
        type="date"
        outlined
      ></v-text-field>
      <v-select
        :items="items"
        label="Sex"
        v-model="formData.sex"
        :rules="formRules.sex"
        outlined
      ></v-select>
      <v-text-field
        label="Phone number"
        v-model="formData.phone_number"
        :rules="formRules.phone_number"
        type="number"
        outlined
      ></v-text-field>
      <v-text-field
        label="Aadhar number"
        v-model="formData.aadhar_number"
        :rules="formRules.aadhar_number"
        type="number"
        outlined
      ></v-text-field>

      <v-container class="form-actions">
        <v-btn
          :color="$vuetify.theme.themes.light.primary"
          class="white--text"
          :loading="isAddPatientLoading"
          :disabled="isAddPatientLoading"
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
        address: "",
        date_of_birth: "",
        sex: "",
        phone_number: "",
        aadhar_number: "",
      },
      isValid: true,
      items: ["male", "female"],
      formRules: {
        name: [(v) => !!v || "Name is required"],
        address: [(v) => !!v || "Address is required"],
        date_of_birth: [(v) => !!v || "DOB is required"],
        sex: [(v) => !!v || "Sex is required"],
        phone_number: [
          (v) => !!v || "Phone number is required",
          (v) => (v && v.length === 10) || "Phone number must be 10 digits",
        ],
        aadhar_number: [
          (v) => !!v || "Phone number is required",
          (v) => (v && v.length === 12) || "Aadhar number must be 12 digits",
        ],
      },
    };
  },
  computed: {
    isAddPatientLoading() {
      return this.$store.getters.addPatientLoading;
    },
  },
  methods: {
    async submitHandler() {
      this.$refs.formRef.validate();
      console.log(this.isValid);
      if (!this.isValid) return;
      await this.$store.dispatch("addPatient", this.formData);
      this.$router.push("/home");
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
