import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

// Ajout des différentes pages du projet ----------------------------------------------
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "Groupomania - Accueil",
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Groupomania - Connexion",
    },
  },

  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      title: "Groupomania - Inscription",
    },
  },

  {
    path: "/wall",
    name: "Wall",
    component: () => import("../views/Wall.vue"),
    meta: {
      title: "Groupomania - Mur",
      requiresAuth: true, // Authentification requise, cf fonction beforeEach plus bas
    },

    children: [
      {
        path: "/posts/add",
        name: "addPost",
        component: () => import("../components/PostModal.vue"),
        meta: {
          title: "Groupomania - Publier",
          showModal: true,
          requiresAuth: true,
          props: true,
        },
      },

      {
        path: "/posts/:id",
        name: "modifyPost",
        component: () => import("../components/PostModifyModal.vue"),
        meta: {
          title: "Groupomania - Modifier un post",
          showModal: true,
          requiresAuth: true,
          props: true,
        },
      },
    ],
  },

  {
    path: "/profil",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
    meta: {
      title: "Groupomania - Profil",
      requiresAuth: true,
    },

    children: [
      {
        path: "/profil/modify",
        name: "modifyProfil",
        component: () => import("../components/UserModifyModal.vue"),
        meta: {
          title: "Groupomania - Modifier le profil",
          showModal: true,
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: "/profil/:id",
    name: "otherProfil",
    component: () => import("../views/profileOther.vue"),
    meta: {
      title: "Groupomania - Profil",
      requiresAuth: true,
    },
  },

  {
    // Page d'erreur appelée si le chemin renseigné n'existe pas
    path: "/:pathMatch(.*)",
    name: "Error",
    component: () => import("../views/ErrorPage.vue"),
    meta: {
      title: "404 Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Permet de revenir à la position initiale de la page
    window.scrollTo(0, 0);
  },
});

// Cette fonction empêche l'accès à certaines pages si l'user n'est pas authentifié
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      // On utiliser les getters pour la vérification
      next();
      return;
    }
    next("/login"); // Dans le cas échéant l'user est redirigé vers la page de connexion
    alert("Bien essayé mais il va falloir se connecter ! 😀"); // NE PAS LAISSER ! ❌
  } else {
    next();
  }
});

// Fonction permettant de mettre à jour le titre de la page en fonction du routeur
router.afterEach((to, from) => {
  console.log(from, to);
  document.title = to.meta.title;
});

export default router;
