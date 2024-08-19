import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
  ],
});

export default router;
