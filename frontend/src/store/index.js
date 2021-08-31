import { resolveDirective } from "vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import userService from "../services/auth";
import postService from "../services/posts";

// Le store fait office de middleware pour gérer les différentes actions de l'utilisateur --------------------------
const store = createStore({
  plugins: [createPersistedState()], // Ce plugin va permettre de garder le state intact si la page est rafraîchie

  state: {
    status: "",
    user: {},
    users: [],
    token: localStorage.getItem("token") || "",

    posts: [],
    post: {}
  },

  mutations: {
    AUTH_REQ(state) {
      state.status = "loading";
    },

    AUTH_SUCCES(state, token, user) {
      (state.status = "succes"), (state.token = token), (state.user = user);
    },

    CREATE_SUCCES(state, user) {
      (state.status = "accountCreated"), (state.user = user);
    },

    LOG_OUT(state) {
      (state.status = "notConnected"), (state.token = "");
    },

    AUTH_ERROR(state) {
      state.status = "error";
    },
  },

  getters: {
    // Nécessaire pour vérifier si l'user est authentifié
    isLoggedIn: (state) => !!state.token, // !! convertit la valeur en boolean et fixe à true
    authStatus: (state) => state.status,
  },

  actions: {
    // USERS ---------------------------------------------------------------------------------------------------
    // Création de l'user -----------------------------------------------
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQ", "loading");
        userService
          .signup(userInfos) // userInfos correspond aux données renseignées dans le formulaire
          .then(function(response) {
            commit("CREATE_SUCCES");
            alert(response.data.message);
            resolve(response.data);
          })
          .catch(function(error) {
            commit("AUTH_ERROR");
            reject(error);
          });
      });
    },

    // Connexion de l'user ----------------------------------------------
    logToAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQ", "loading");
        userService
          .login(userInfos)
          .then(function(response) {
            const token = response.data.token; // Le token est récupéré
            //console.log("token:", token);
            localStorage.setItem("token", token); // Puis transmis au localStorage
            commit("AUTH_SUCCES", token);
            alert(response.data.message);
            resolve(response.data);
          })
          .catch(function(error) {
            commit("AUTH_ERROR");
            localStorage.clear();
            reject(error);
          });
      });
    },

    // Déconnexion de l'user -----------------------------------------------
    logOut: ({ commit }) => {
      return new Promise((resolve) => {
        commit("LOG_OUT");
        alert("A bientôt 👋");
        localStorage.clear(); // On purge le localStorage pour ne plus préserver l'état précédent du state, ni le token
        resolve();
      });
    },

    // POSTS ---------------------------------------------------------------------------------------------------
    // Récupération des posts -----------------------------------------------
    getAllPosts: ({ commit }) => {
      return new Promise((resolve, reject) => {
        postService
          .getAllPosts()
          .then(function(response) {
            const posts = response.data;
            commit("GET_POSTS", posts);
            resolveDirective(response.data)
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },
  },
});

export default store;
