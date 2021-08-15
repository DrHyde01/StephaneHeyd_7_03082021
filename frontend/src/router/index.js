import { createRouter, createWebHistory } from "vue-router";

// Ajout des différentes pages du projet ----------------------------------------------
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Groupomania - Accueil",
    }
  },
  
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Groupomania - Connexion",
    }
  },

  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      title: "Groupomania - Inscription",
    }
  },

  {
    path: "/wall",
    name: "Wall",
    component: () => import("../views/Wall.vue"),
    meta: {
      title: "Groupomania - Mur",
    }
  },

  {
    path: "/profil",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
    meta: {
      title: "Groupomania - Profil",
    }
  },

  {
    // Page d'erreur appelée si le chemin renseigné n'existe pas
    path: "/:pathMatch(.*)",
    name: "Error",
    component: () => import("../views/ErrorPage.vue"),
    meta: {
      title: "404 Not Found",
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


// Function permettant de mettre à jour le titre de la page en fonction du routeur
router.afterEach((to, from) => {
  console.log(from, to);
  document.title = to.meta.title;
})

export default router;
