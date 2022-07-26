import { createWebHistory, createRouter } from "vue-router";
import adminRoutes from "./AdminRoutes";
import authRoutes from "./authRoutes";
import store from "@/vuex/store";

const routes = [
  {
    name: "Admin",
    path: "/",
    redirect: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/layout/withAdminLayout.vue"),
    children: [...adminRoutes],
    meta: { auth: false },
  },
  {
    name: "Auth",
    path: "/auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/layout/withAuthLayout.vue"),
    children: [...authRoutes],
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_SUB_ROUTE
        ? process.env.VUE_APP_SUB_ROUTE
        : process.env.BASE_URL
      : process.env.BASE_URL
  ),
  linkExactActiveClass: "active",
  routes,
  // scrollBehavior: ()=>{
  //   return { x: 0, y: 0 };
  // }
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  // console.log(store.state.auth);
  // console.log(to, store);
  if (to.meta.auth && store.state.auth.login) {
    next({ to: "/" });
  } else if (!to.meta.auth && !store.state.auth.login) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
