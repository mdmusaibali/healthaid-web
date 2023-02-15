import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark:true,
    themes: {
      light: {
        primary: "#1363DF",
        // secondary: "#b0bec5",
        // accent: "#8c9eff",
        error: "#ef4444",
      },
    },
  },
});
