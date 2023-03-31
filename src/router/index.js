import store from "@/store";
import HomeView from "@/views/HomeView.vue";
import ScanView from "@/views/ScanView.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/LoginView.vue";
import PatientDetailsView from "@/views/PatientDetailsView.vue";
import AddPatientView from "@/views/AddPatientView.vue";
import AdminLoginView from "@/views/admin/AdminLoginView";
import AdminHomeView from "@/views/admin/AdminHomeView";
import AdminAddStaffView from "@/views/admin/AdminAddStaffView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/patient-details",
    name: "patient-details",
    component: PatientDetailsView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/scan",
    name: "scan",
    component: ScanView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/add-patient",
    name: "add-patient",
    component: AddPatientView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLoginView,
  },
  {
    path: "/admin-home",
    name: "admin-home",
    component: AdminHomeView,
    meta: {
      needAdminAuth: true,
    },
  },
  {
    path: "/add-staff",
    name: "add-staff",
    component: AdminAddStaffView,
    meta: {
      needAdminAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach(function (to, from, next) {
  if (to.meta.needAuth) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next("/");
    }
  } else if (to.meta.needAdminAuth) {
    if (store.getters.isAdminLoggedIn) {
      next();
    } else {
      next("/admin");
    }
  } else {
    next();
  }
});

export default router;
