<template>
  <div>
    <v-progress-linear
      v-if="isGetPatientsLoading"
      indeterminate
      color="#1363DF"
    ></v-progress-linear>
    <div class="patients">
      <patient-card
        v-for="patient in patients"
        :patient="patient"
      ></patient-card>
    </div>
  </div>
</template>

<script>
import { PatientCard } from "./../components";

export default {
  components: {
    PatientCard,
  },
  mounted() {
    if (!this.isLoggedIn) {
      return this.$router.push("/");
    }
    this.$store.dispatch("getPatients");
  },
  computed: {
    patients() {
      return this.$store.getters.getPatients;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isGetPatientsLoading() {
      return this.$store.getters.getPatientsLoading;
    },
  },
  watch: {
    isLoggedIn(newV) {
      if (!newV) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
.patients {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}
</style>
