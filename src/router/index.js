import store from "@/store";
import HomeView from "@/views/HomeView.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import PatientDetailsView from "../views/PatientDetailsView.vue";
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
    props: true,
    component: PatientDetailsView,
    meta: {
      needAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(function (to, from, next) {
  if (to.meta.needAuth) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
