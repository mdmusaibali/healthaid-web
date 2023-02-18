<template>
  <v-container class="container">
    <patient-details-card
      v-if="patient"
      :patient="patient"
    ></patient-details-card>
    <patient-visit-card v-if="patient" :patient="patient"></patient-visit-card>
  </v-container>
</template>

<script>
import { PatientDetailsCard, PatientVisitCard } from "./../components";
import autoLogout from "@/mixins/autoLogout";

export default {
  mixins: [autoLogout],
  components: {
    PatientDetailsCard,
    PatientVisitCard,
  },
  data() {
    return {
      patient: null,
      patientId: null,
    };
  },
  mounted() {
    // this.patient = this.$route?.params?.patient;
    const patientId = this.$route?.query?.patientId;
    this.fillPatientData(patientId);
  },
  computed: {
    getPatients() {
      return this.$store.getters.getPatients;
    },
  },
  methods: {
    fillPatientData(id) {
      const patients = this.getPatients;
      if (patients && Array.isArray(patients)) {
        const patient = patients.find((p) => p.patient_id === id);
        this.patient = patient;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40fr 60fr;
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
