import HomeView from "@/views/HomeView.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
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
  },
];

// router.beforeEach(function (to, from, next) {
//   if (to.meta.needAuth) {
//     if (store.getters.isLoggedIn) {
//       next();
//     } else {
//       next("/");
//     }
//   } else {
//     next();
//   }
// });

const router = new VueRouter({
  routes,
});

export default router;
