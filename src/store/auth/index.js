import axiosInstance from "@/utils/axios";
import { clearSession, setSession } from "./../../utils/session";

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
    login(state, { authToken }) {
      state.isLoggedIn = true;
      state.authToken = authToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      clearSession();
    },
  },
  actions: {
    async login(context, { email, password }) {
      console.log(email, password);
      const response = await axiosInstance.post("/users/staff/login/", {
        email,
        password,
      });
      const data = await response.data;
      if (data.access_token) {
        setSession(data.access_token);
        context.commit("login", { authToken: data.access_token });
      }
    },
  },
  modules: {},
};
