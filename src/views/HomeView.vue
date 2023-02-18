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
import autoLogout from "@/mixins/autoLogout";
export default {
  mixins: [autoLogout],
  components: {
    PatientCard,
  },
  mounted() {
    this.$store.dispatch("getPatients");
  },
  computed: {
    patients() {
      return this.$store.getters.getPatients;
    },
    isGetPatientsLoading() {
      return this.$store.getters.getPatientsLoading;
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
  padding: 1rem 0rem;
}
</style>
