import axiosInstance from "@/utils/axios";
import { sleeper } from "./../../utils/helper";
import Vue from "vue";

export default {
  state: {
    patients: [],
    isLoading: {
      getPatients: null,
      addPatient: null,
    },
  },
  getters: {
    getPatients(state) {
      return state.patients;
    },
    getPatientsLoading(state) {
      return state.isLoading.getPatients;
    },
    addPatientLoading(state) {
      return state.isLoading.addPatient;
    },
  },
  mutations: {
    fillPatients(state, payload) {
      state.patients = payload;
    },
    setLoadingState(state, { of, value }) {
      state.isLoading[of] = value;
    },
    appendPatient(state, payload) {
      state.patients.push(payload);
    },
  },
  actions: {
    async getPatients(context) {
      context.commit("setLoadingState", { of: "getPatients", value: true });
      try {
        const response = await axiosInstance.get("/users/staff/get_patients/");
        const data = await response.data;
        if (data) {
          context.commit("fillPatients", data);
        }
      } catch (error) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.code
        ) {
          if (error.response.data.code === "token_not_valid") {
            context.commit("logout", { message: "Session expired" });
            console.log("CONTEXT", context);
          }
        }
        console.error("ERROR", error);
      }
      context.commit("setLoadingState", {
        of: "getPatients",
        value: false,
      });
    },
    async addPatient(context, payload) {
      if (!payload) return;
      console.log("PAYLOAD", payload);
      context.commit("setLoadingState", { of: "addPatient", value: true });
      try {
        const response = await axiosInstance.post(
          "/users/staff/create_patient/",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const data = await response.data;
        if (data && data?.patient_id) {
          context.commit("appendPatient", data);
          Vue.$toast.open({
            type: "success",
            message: "Patient has been added",
          });
        }
      } catch (error) {
        console.error("ERROR", error);
        Vue.$toast.open({ type: "error", message: "Something went wrong!" });
      }
      context.commit("setLoadingState", {
        of: "addPatient",
        value: false,
      });
    },
  },
};
