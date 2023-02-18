export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
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
