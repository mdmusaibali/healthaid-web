import axiosInstance from "@/utils/axios";
import { clearSession, setSession } from "./../../utils/session";
import Vue from "vue";

export default {
  state: {
    isLoggedIn: false,
    authToken: null,
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    login(state, { authToken, message }) {
      state.isLoggedIn = true;
      state.authToken = authToken;
      Vue.$toast.open({ type: "success", message });
    },
    logout(state, { message }) {
      state.isLoggedIn = false;
      clearSession();
      Vue.$toast.open({ type: "error", message });
    },
  },
  actions: {
    async login(context, { email, password }) {
      try {
        const response = await axiosInstance.post("/users/staff/login/", {
          email,
          password,
        });
        const data = await response.data;
        if (data.access_token) {
          setSession(data.access_token);
          context.commit("login", {
            authToken: data.access_token,
            message: "Logged in",
          });
        }
      } catch (error) {
        Vue.$toast.open({ type: "error", message: "Something went wrong!" });
      }
    },
  },
  modules: {},
};
