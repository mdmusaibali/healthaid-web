<template>
  <v-app>
    <navigation-drawer
      :drawer="drawer"
      v-if="isLoggedIn"
      @update-drawer="toggleDrawer"
    ></navigation-drawer>

    <admin-navigation-drawer
      :drawer="adminDrawer"
      v-if="isAdminLoggedIn"
      @update-drawer="toggleAdminDrawer"
    ></admin-navigation-drawer>

    <v-app-bar app class="elevation-1">
      <v-app-bar-nav-icon
        v-if="isLoggedIn || isAdminLoggedIn"
        @click.stop="
          isAdminLoggedIn ? (adminDrawer = !adminDrawer) : (drawer = !drawer)
        "
      ></v-app-bar-nav-icon>

      <img src="@/assets/img/logo512.png" class="logo" />

      <v-toolbar-title>Health aid</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="mx-2" @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn
        class="mx-2 white--text"
        color="#ef4444"
        v-if="isLoggedIn || isAdminLoggedIn"
        @click="logoutHandler"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main class="main">
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
import { NavigationDrawer, AdminNavigationDrawer } from "./components";
export default {
  name: "App",
  components: {
    NavigationDrawer,
    AdminNavigationDrawer,
  },
  data: () => ({
    drawer: false,
    adminDrawer: false,
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
    isAdminLoggedIn() {
      console.log("ADMIN: ", this.$store.getters.isAdminLoggedIn);
      return this.$store.getters.isAdminLoggedIn;
    },
  },
  methods: {
    toggleDrawer(value) {
      this.drawer = value;
    },
    toggleAdminDrawer(value) {
      console.log("ADMIN DRAWER:", value);
      this.adminDrawer = value;
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logoutHandler() {
      this.$store.commit("logout", { message: "Logged out" });
      this.$store.commit("adminLogout");
    },
  },
};
</script>

<style scoped>
.view {
  height: 100vh;
  width: 100%;
  /* background-color: black; */
}
.main {
  height: calc(100vh - 64px);
  overflow-y: scroll;
}
.main::-webkit-scrollbar {
  display: none;
}
.logo {
  height: 60px;
  width: 60px;
}
</style>
