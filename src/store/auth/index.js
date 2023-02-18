import axiosInstance from "@/utils/axios";
import { clearSession, setSession } from "./../../utils/session";
import Vue from "vue";

export default {
  state: {
    isLoggedIn: false,
    authToken: null,
    status: {
      login: null,
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    loginLoading(state) {
      return state.status.login;
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
      Vue.$toast.open({ type: "info", message });
    },
    setLoadingState(state, { of, value }) {
      state.status[of] = value;
    },
  },
  actions: {
    async login(context, { email, password }) {
      try {
        context.commit("setLoadingState", { of: "login", value: true });
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
      context.commit("setLoadingState", {
        of: "login",
        value: false,
      });
    },
  },
};
