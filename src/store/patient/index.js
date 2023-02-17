import axiosInstance from "@/utils/axios";
import { sleeper } from "./../../utils/helper";

export default {
  state: {
    patients: [],
    isLoading: {
      getPatients: null,
    },
  },
  getters: {
    getPatients(state) {
      return state.patients;
    },
    getPatientsLoading(state) {
      return state.isLoading.getPatients;
    },
  },
  mutations: {
    fillPatients(state, payload) {
      state.patients = payload;
    },
    setLoadingState(state, { of, value }) {
      state.isLoading[of] = value;
    },
  },
  actions: {
    async getPatients(context) {
      context.commit("setLoadingState", { of: "getPatients", value: true });
      try {
        const response = await axiosInstance.get("/users/staff/get_patients/");
        const data = await response.data;
        await sleeper(1000);
        if (data && data.length !== 0) {
          context.commit("fillPatients", data);
        }
      } catch (error) {
        console.error(error);
      }
      context.commit("setLoadingState", {
        of: "getPatients",
        value: false,
      });
    },
  },
};