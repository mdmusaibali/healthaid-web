import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import dialog from "./dialog";
import patient from "./patient";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    dialog,
    patient,
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
