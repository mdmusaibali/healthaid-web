import axiosInstance from "@/utils/axios";
import { setSession } from "@/utils/session";
import Vue from "vue";

export default {
  state: {
    isLoggedIn: false,
    authToken: null,
    staff: [],
    status: {
      login: null,
      getStaff: null,
      deleteStaff: null,
      addStaff: null,
    },
  },
  getters: {
    isAdminLoggedIn(state) {
      return state.isLoggedIn;
    },
    adminLoginLoading(state) {
      return state.status.login;
    },
    getStaffLoading(state) {
      return state.status.getStaff;
    },
    deleteStaffLoading(state) {
      return state.status.deleteStaff;
    },
    getStaffList(state) {
      return state.staff;
    },
    addStaffLoading(state) {
      return state.status.addStaff;
    },
  },
  mutations: {
    adminLogin(state, { authToken, message }) {
      state.isLoggedIn = true;
      state.authToken = authToken;
      Vue.$toast.open({ type: "success", message });
    },
    adminLogout(state) {
      state.isLoggedIn = false;
    },
    setLoadingState(state, { of, value }) {
      state.status[of] = value;
    },
    fillStaff(state, payload) {
      state.staff = payload;
    },
    removeStaff(state, payload) {
      const index = state.staff.findIndex((staff) => staff.user.id === payload);
      if (index !== -1) {
        state.staff.pop(index);
      }
    },
  },
  actions: {
    async adminLogin(context, { email, password }) {
      try {
        context.commit("setLoadingState", { of: "login", value: true });
        const response = await axiosInstance.post("/users/superadmin/login/", {
          email,
          password,
        });
        const data = await response.data;
        if (data.access) {
          setSession(data.access);
          context.commit("adminLogin", {
            authToken: data.access,
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
    async getStaff(context) {
      try {
        context.commit("setLoadingState", { of: "getStaff", value: true });
        const response = await axiosInstance.get(
          "/users/superadmin/get_staff/"
        );
        const data = await response.data;
        console.log("DATA ", data);
        if (data?.length > 0) {
          context.commit("fillStaff", data);
        }
      } catch (error) {
        Vue.$toast.open({ type: "error", message: "Something went wrong!" });
      }
      context.commit("setLoadingState", {
        of: "getStaff",
        value: false,
      });
    },
    async deleteStaff(context, payload) {
      try {
        context.commit("setLoadingState", { of: "deleteStaff", value: true });
        await axiosInstance.delete("/users/superadmin/delete_staff/" + payload);
        context.commit("removeStaff", payload);
      } catch (error) {
        Vue.$toast.open({ type: "error", message: "Something went wrong!" });
      }
      context.commit("setLoadingState", {
        of: "deleteStaff",
        value: false,
      });
    },
    async addStaff(context, payload) {
      try {
        context.commit("setLoadingState", { of: "addStaff", value: true });
        await axiosInstance.post("/users/superadmin/create_staff/", payload);
        context.dispatch("getStaff");
      } catch (error) {
        Vue.$toast.open({ type: "error", message: "Something went wrong!" });
      }
      context.commit("setLoadingState", {
        of: "addStaff",
        value: false,
      });
    },
  },
};
