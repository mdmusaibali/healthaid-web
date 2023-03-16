<template>
  <div>
    <v-progress-linear
      indeterminate
      color="#1363DF"
      v-if="staffLoading || deleteStaffLoading"
    ></v-progress-linear>
    <div class="staff">
      <staff-card v-for="staff in staffList" :staff="staff"></staff-card>
    </div>
  </div>
</template>

<script>
import autoLogout from "@/mixins/autoLogout";
import { StaffCard } from "./../../components";
export default {
  mixins: [autoLogout],
  components: {
    StaffCard,
  },
  mounted() {
    if (!this.isAdminLoggedIn) {
      this.$router.push("/admin");
    }
    this.$store.dispatch("getStaff");
  },
  computed: {
    isAdminLoggedIn() {
      return this.$store.getters.isAdminLoggedIn;
    },
    staffList() {
      return this.$store.getters.getStaffList;
    },
    staffLoading() {
      return this.$store.getters.getStaffLoading;
    },
    deleteStaffLoading() {
      return this.$store.getters.deleteStaffLoading;
    },
  },
  watch: {
    isAdminLoggedIn(value) {
      if (!value) this.$router.push("/admin");
    },
  },
};
</script>

<style>
.staff {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem 1rem;
}
@media (max-width: 1000px) {
  .staff {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .staff {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
