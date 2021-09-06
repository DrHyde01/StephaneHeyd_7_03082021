//import { resolveDirective } from "vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import userService from "../services/auth";
import postService from "../services/posts";

// Le store fait office de middleware pour gérer les différentes actions de l'utilisateur --------------------------
const store = createStore({
  plugins: [createPersistedState()], // Ce plugin va permettre de garder le state intact si la page est rafraîchie

  state: {
    status: "",
    user: {
      userId: "",
      username: "",
      email: "",
      picture: "",
      isAdmin: false,
      token: "",
    },
    posts: [],
    post: {},
  },

  mutations: {
    // USERS ------------------------------------------------------------------------------------------------------
    CREATE_SUCCES(state) {
      state.status = "accountCreated";
    },

    AUTH_REQ(state) {
      state.status = "loading";
    },

    AUTH_SUCCES(
      state,
      { userId, token, userName, userMail, userPicture, userIsAdmin }
    ) {
      // Les infos seront disponibles tant que l'user est connecté
      (state.status = "isConnected"),
        (state.user.userId = userId),
        (state.user.token = token);
      (state.user.username = userName),
        (state.user.email = userMail),
        (state.user.picture = userPicture),
        (state.user.isAdmin = userIsAdmin);
    },

    LOG_OUT(state) {
      (state.status = "notConnected"),
        (state.user.userId = ""),
        (state.user.username = ""),
        (state.user.email = ""),
        (state.user.picture = ""),
        (state.user.isAdmin = false),
        (state.user.token = ""),
        (state.posts = []);
    },

    AUTH_ERROR(state) {
      state.status = "error";
    },

    // POSTS ---------------------------------------------------------------------------------------------------
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
  },

  getters: {
    // Nécessaire pour vérifier si l'user est authentifié
    isLoggedIn: (state) => !!state.user.token, // !! convertit la valeur en boolean et fixe à true
    authStatus: (state) => state.status,
  },

  actions: {
    // USERS ---------------------------------------------------------------------------------------------------

    // Création de l'user ---------------------------------------------------------------
    createAccount: ({ commit }, signInfos) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQ");
        userService
          .signup(signInfos) // signInfos correspond aux données renseignées dans le formulaire
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

    // Connexion de l'user --------------------------------------------------------------------------------
    logToAccount: ({ commit }, logInfos) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQ");
        userService
          .login(logInfos)
          .then(function(response) {
            const token = response.data.token; // Le token est récupéré
            const userId = response.data.userId; // Et l'userId
            localStorage.setItem("token", token); // Puis transmis au localStorage
            localStorage.setItem("UserId", userId);
            commit("AUTH_SUCCES", { token, userId }); // Première mutation pour la connexion
            //alert(response.data.message);
            resolve(response.data);
          })
          .catch(function(error) {
            commit("AUTH_ERROR");
            localStorage.clear(); // On purge le localStorage si erreur de connexion
            reject(error);
          });
      });
    },

    // Récupération des informations de l'user une fois la connexion établie ------------------------------------------------------------
    getUserInfos: ({ commit }) => {
      return new Promise((resolve, reject) => {
        const id = localStorage.getItem("UserId"); // Récupération de l'id, necessaire à l'appel API
        userService
          .getUser(id)
          .then(function(response) {
            // On récupère les infos dont on a besoin puis on les rajoute au store
            const userName = response.data.user.username;
            const userMail = response.data.user.email;
            const userPicture = response.data.user.picture;
            const userIsAdmin = response.data.user.admin;

            // On a besoin du token de l'userId pour la nouvelle mutation de AUTH_SUCCES
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("UserId");

            commit("AUTH_SUCCES", {
              token,
              userId,
              userName,
              userMail,
              userPicture,
              userIsAdmin,
            });
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Déconnexion de l'user ------------------------------------------------------------------------------------------
    logOut: ({ commit }) => {
      return new Promise((resolve) => {
        commit("LOG_OUT");
        alert("A bientôt 👋");
        localStorage.clear(); // On purge le localStorage pour remettre le store à zéro
        resolve();
      });
    },

    // POSTS ----------------------------------------------------------------------------------------------------------

    // Récupération des posts --------------------------------------------------------------------
    getAllPosts: ({ commit }) => {
      return new Promise((resolve, reject) => {
        postService
          .getAllPosts()
          .then(function(response) {
            const posts = response.data.posts;
            console.log(posts);
            commit("GET_POSTS", posts);
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },
  },
});

export default store;
