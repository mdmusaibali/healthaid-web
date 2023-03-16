<template>
  <v-card class="patient-details-card" id="container">
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" class="menu">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="list-item"
          @click="item?.onClick()"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-img
      max-height="170"
      max-width="170"
      class="rounded-circle avatar mt-6"
      :src="patient.picture || noImage"
    ></v-img>
    <h3 class="id grey--text text--darken-1 mt-2 mb-6">
      #{{ patient.patient_id }}
    </h3>
    <div class="align-self-start mb-3">
      <p class="ma-0 grey--text text--darken-1 font-weight-medium">Name</p>
      <p class="text-h6 ma-0">{{ patient.name }}</p>
    </div>
    <div class="align-self-start mb-3">
      <p class="ma-0 grey--text text--darken-1 font-weight-medium">
        Date of birth
      </p>
      <p class="text-h6 ma-0">{{ patient.date_of_birth }}</p>
    </div>
    <div class="align-self-start mb-3">
      <p class="ma-0 grey--text text--darken-1 font-weight-medium">Age</p>
      <p class="text-h6 ma-0">{{ getAge(patient.date_of_birth) }}</p>
    </div>
    <div class="align-self-start mb-3">
      <p class="ma-0 grey--text text--darken-1 font-weight-medium">Sex</p>
      <p class="text-h6 ma-0">{{ patient.sex }}</p>
    </div>
    <div class="align-self-start mb-3">
      <p class="ma-0 grey--text text--darken-1 font-weight-medium">Phone</p>
      <p class="text-h6 ma-0">{{ patient.phone_number }}</p>
    </div>
    <div class="align-self-start mb-3">
      <p class="ma-0 grey--text text--darken-1 font-weight-medium">
        Aadhar number
      </p>
      <p class="text-h6 ma-0">{{ patient.aadhar_number }}</p>
    </div>
    <div class="align-self-start mb-3">
      <p class="ma-0 grey--text text--darken-1 font-weight-medium">Address</p>
      <p class="text-h6 ma-0">{{ patient.address }}</p>
    </div>
  </v-card>
</template>

<script>
import axiosInstance from "@/utils/axios";
import { formatDate } from "@/utils/helper";

export default {
  props: ["patient"],
  data() {
    return {
      items: [{ title: "delete", onClick: this.deleteUser }],
    };
  },
  computed: {
    noImage() {
      return require("./../../assets/img/no_image.png");
    },
  },
  methods: {
    getAge(dob) {
      return formatDate(dob, "age");
    },
    async deleteUser() {
      try {
        const response = await axiosInstance.delete(
          `/users/staff/delete_patient/${this.patient?.patient_id}`
        );
        this.$router.push("/home");
        this.$toast.success("Deleted user successfully");
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.patient-details-card {
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
.list-item {
  cursor: pointer;
}
.avatar {
  border: 4px solid #1363df;
}
</style>
