import { createRouter, createWebHistory } from "vue-router";

// Ajout des différentes pages du projet ----------------------------------------------
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },

  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },

  {
    path: "/wall",
    name: "Wall",
    component: () => import("../views/Wall.vue"),
  },

  {
    path: "/profil",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
