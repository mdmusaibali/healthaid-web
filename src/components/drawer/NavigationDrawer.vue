<template>
  <v-navigation-drawer v-model="drawerState" app>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Pokemon </v-list-item-title>
          <v-list-item-subtitle>pokemon5@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link to="/home">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/scan">
        <v-list-item-icon>
          <v-icon>mdi-qrcode</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Scan patient ID</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/add-patient">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Add patient</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  computed: {
    drawerState: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update-drawer", value);
      },
    },
  },
};
</script>
