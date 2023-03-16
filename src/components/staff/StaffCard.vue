<template>
  <v-card class="staff-card">
    <div>
      <img :src="staff.user.picture || noProfileImage" class="image" />
    </div>
    <div>
      <h3 class="id grey--text text--darken-1 mb-2">#{{ staff.user.id }}</h3>
      <h3 class="name">{{ staff.user.name }}</h3>
      <h3 class="grey--text text--darken-1 mb-2">{{ staff.user.email }}</h3>
    </div>
    <v-icon class="delete" @click="deleteStaff(staff.user.id)"
      >mdi-delete</v-icon
    >
  </v-card>
</template>

<script>
export default {
  props: ["staff"],
  data() {
    return {
      noProfileImage: require("./../../assets/img/no_image.png"),
    };
  },
  methods: {
    deleteStaff(id) {
      this.$store.dispatch("deleteStaff", id);
    },
  },
};
</script>

<style scoped lang="scss">
.staff-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  position: relative;
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
.delete {
  cursor: pointer;
}
</style>
