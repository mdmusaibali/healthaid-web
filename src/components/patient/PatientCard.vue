<template>
  <v-card class="patient-card" @click="goToDetailsPage">
    <div>
      <img :src="patient.picture || noProfileImage" class="image" />
    </div>
    <div>
      <h3 class="name">{{ patient.name }}</h3>
      <h3 class="id grey--text text--darken-1 mb-2">
        #{{ patient.patient_id }}
      </h3>
      <v-chip close-icon="mdi-close-outline" class="mr-2" label small>{{
        patient.sex
      }}</v-chip>
      <v-chip close-icon="mdi-close-outline" label small>{{
        getAge(patient.date_of_birth)
      }}</v-chip>
    </div>
  </v-card>
</template>

<script>
import { formatDate } from "./../../utils/helper";

export default {
  props: ["patient"],
  data() {
    return {
      noProfileImage: require("./../../assets/img/no_image.png"),
    };
  },
  methods: {
    goToDetailsPage() {
      this.$router.push({
        name: "patient-details",
        query: {
          patientId: this.patient.patient_id,
        },
      });
    },
    getAge(dob) {
      return formatDate(dob, "age");
    },
  },
};
</script>

<style scoped lang="scss">
.patient-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    scale: 0.97;
  }
}
.image {
  height: 100px;
  width: 100px;
  border-radius: 100%;
}
.name {
  letter-spacing: 0.8px;
  font-weight: 500;
  font-size: 1.3rem;
}
.id {
  font-size: 0.9rem;
}
</style>
