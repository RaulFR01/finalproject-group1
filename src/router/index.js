import { createRouter, createWebHistory } from "vue-router";
import { useAlertStore } from "../store/alert";
import HomeView from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../pages/Auth.vue"),
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    component: () => import("../pages/ResetPassword.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../pages/Profile.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../pages/Dashboard.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();
});

export default router;
