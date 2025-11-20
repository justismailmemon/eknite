import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Workspace from "@/pages/Workspace.vue";
import Documents from "@/pages/Documents.vue";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  { path: "/", redirect: "/workspace" },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/workspace",
    name: "Workspace",
    component: Workspace,
    meta: { requiresAuth: true },
  },
  {
    path: "/workspace/:id/documents",
    name: "Documents",
    component: Documents,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Auth guard + Progress Bar
const authPages = ["/login", "/register"];

router.beforeEach((to, from, next) => {
  // Start NProgress
  NProgress.start();

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  if (isAuthenticated && authPages.includes(to.path)) {
    return next("/");
  }

  next();
});

// Finish NProgress
router.afterEach(() => {
  NProgress.done();
});

export default router;
