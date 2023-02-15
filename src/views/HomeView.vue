<template>
  <h1>HOME</h1>
</template>

<script>
export default {
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
    }
  },
  watch: {
    isLoggedIn(newV, oldV) {
      if (!newV) {
        this.$router.push("/");
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
