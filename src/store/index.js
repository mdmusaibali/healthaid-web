import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import dialog from "./dialog";
import patient from "./patient";
import admin from "./admin";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    dialog,
    patient,
    admin,
  },
  state: {
    text: "",
  },
  getters: {
    getText(state) {
      return state.text;
    },
  },
  mutations: {},
  actions: {},
});
