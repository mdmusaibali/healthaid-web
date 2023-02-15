import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import dialog from "./dialog";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    dialog,
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
