<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>HealthAid</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="mx-2" @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn class="mx-2" v-if="isLoggedIn" @click="logoutHandler">
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
      <!-- // DIALOG -->
      <v-dialog v-model="dialogOpen" width="300">
        <v-card>
          <v-card-text class="pa-3">
            {{ $store.getters.dialogText }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="$store.commit('closeDialog')">
              Okay
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    dialogOpen: {
      get() {
        return this.$store.getters.isDialogOpen;
      },
      set(value) {
        console.log(value);
        this.$store.commit("closeDialog");
      },
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logoutHandler() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style>
.view {
  height: 100vh;
  width: 100%;
  /* background-color: black; */
}
</style>
