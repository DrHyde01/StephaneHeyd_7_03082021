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
    user: {},
    users: [],
    posts: [],
    post: {},

    message: "",
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
      {
        userId,
        token,
        userName,
        userFirstName,
        userLastName,
        userBirth,
        userMail,
        userPicture,
        userDescription,
        userIsAdmin,
      }
    ) {
      // Les infos seront disponibles tant que l'user est connecté
      (state.status = "isConnected"),
        (state.user.userId = userId),
        (state.user.token = token);
      (state.user.username = userName),
        (state.user.firstName = userFirstName),
        (state.user.lastName = userLastName),
        (state.user.birth = userBirth),
        (state.user.email = userMail),
        (state.user.picture = userPicture),
        (state.user.description = userDescription),
        (state.user.isAdmin = userIsAdmin);
    },

    GET_OTHER_USER(state, users) {
      state.users = users;
    },

    UPDATE_USER(state, users) {
      state.users = users;
      state.message = "Profil modifié !";
    },

    DELETE_USER(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "Profil supprimé !";
    },

    LOG_OUT(state) {
      (state.status = "notConnected"),
        (state.user.userId = ""),
        (state.user.username = ""),
        (state.user.firstName = ""),
        (state.user.lastName = ""),
        (state.user.birth = ""),
        (state.user.email = ""),
        (state.user.picture = ""),
        (state.user.description = ""),
        (state.user.isAdmin = false),
        (state.user.token = ""),
        (state.posts = []),
        (state.post = {}),
        (state.users = {}),
        (state.message = "");
    },

    AUTH_ERROR(state) {
      state.status = "error";
    },

    // POSTS ---------------------------------------------------------------------------------------------------
    ADD_POST(state, post) {
      state.posts = [post, ...state.posts];
      state.message = "Post publié !";
    },

    GET_POSTS(state, posts) {
      state.posts = posts;
      state.message = "Posts récupérés !";
    },

    GET_ONE_POST(state, post) {
      state.post = post;
    },

    UPDATE_POST(state, post) {
      state.posts = [post, ...state.posts];
      state.message = "Post modifié !";
    },

    DELETE_POST(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)];
      state.message = "Post supprimé !";
    },

    // LIKES --------------------------------------------------------------------------------------------------
    ADD_LIKE(state, like) {
      state.posts = [like, ...state.posts];
      state.message = "Post liké / disliké";
    },

    // COMMENTAIRES -----------------------------------------------------------------------------------------
    ADD_COMMENT(state, comment) {
      state.posts = [comment, ...state.posts];
      state.message = "Post commenté !";
    },

    DELETE_COMMENT(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)];
      state.message = "Commentaire supprimé !";
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
        let id = localStorage.getItem("UserId"); // Récupération de l'id, necessaire à l'appel API
        userService
          .getUser(id)
          .then(function(response) {
            // On récupère les infos dont on a besoin puis on les rajoute au store
            const userName = response.data.username;
            const userFirstName = response.data.firstName;
            const userLastName = response.data.lastName;
            const userBirth = response.data.createdAt;
            const userMail = response.data.email;
            const userPicture = response.data.picture;
            const userDescription = response.data.description;
            const userIsAdmin = response.data.admin;

            // On a besoin du token de l'userId pour la nouvelle mutation de AUTH_SUCCES
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("UserId");

            commit("AUTH_SUCCES", {
              token,
              userId,
              userName,
              userFirstName,
              userLastName,
              userBirth,
              userMail,
              userPicture,
              userDescription,
              userIsAdmin,
            });
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Récupération d'autres users -------------------------------------------------------------------------
    getOtherUser: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        userService
          .getUser(id)
          .then(function(response) {
            const users = response.data;
            commit("GET_OTHER_USER", users); // Risque de comflit avec state.user, plutôt utiliser state.users
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Mise à jour du profil de l'user ---------------------------------------------------------------------
    updateUserInfos({ commit }, data) {
      return new Promise((resolve, reject) => {
        userService
          .updateUser(data.id, data.data)
          .then(function(response) {
            const user = response.data;
            commit("UPDATE_USER", user);
            resolve(response.data);
          })
          .then(() => {
            location.reload()
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Suppresion d'un user--------------------------------------------------------------------------------
    deleteOneUser: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        userService
          .deleteUser(id)
          .then(function(response) {
            commit("DELETE_USER", id); // Le commit permet de supprimer l'élément du store
            resolve(response);
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

    // Création d'un post -------------------------------------------------------------------------
    createPost: ({ commit }, post) => {
      return new Promise((resolve, reject) => {
        postService
          .createPost(post)
          .then(function(response) {
            const post = response.data;
            commit("ADD_POST", post);
            resolve(response.data);
          })
          .then(() => {
            postService.getAllPosts().then(function(response) {
              const posts = response.data;
              console.log(posts);
              commit("GET_POSTS", posts);
              location.reload(false);
              resolve(response.data);
            });
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Récupération des posts --------------------------------------------------------------------
    getAllPosts: ({ commit }) => {
      return new Promise((resolve, reject) => {
        postService
          .getAllPosts()
          .then(function(response) {
            const posts = response.data;
            //console.log(posts);
            commit("GET_POSTS", posts);
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },
    // Récupération d'un post précis -----------------------------------------------------------------
    getPostByID: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        postService
          .getOnePost(id)
          .then(function(response) {
            const post = response.data;
            //console.log(post)
            commit("GET_ONE_POST", post);
            resolve(response.data);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Modification d'un post ---------------------------------------------------------------------
    updatePost({ commit }, data) {
      return new Promise((resolve, reject) => {
        postService
          .updateOnePost(data.id, data.data)
          .then(function(response) {
            const post = response.data;
            commit("UPDATE_POST", post);
            resolve(response.data);
          })
          .then(() => {
            postService.getAllPosts().then(function(response) {
              const posts = response.data;
              commit("GET_POSTS", posts);
              location.reload(false);
              resolve(response.data);
            });
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Suppresion d'un post précis -----------------------------------------------------------------
    deleteOnePost: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        postService
          .deleteOnePost(id)
          .then(function(response) {
            commit("DELETE_POST", id); // Le commit permet de supprimer l'élément du store
            resolve(response);
          })
          .then(() => {
            postService.getAllPosts().then(function(response) {
              const posts = response.data;
              commit("GET_POSTS", posts);
              resolve(response.data);
            });
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // LIKES ----------------------------------------------------------------------------------------------

    // Ajout d'un like ---------------------------------------------------------------------------
    postLike: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        postService
          .addLike(id)
          .then(function(response) {
            const like = response.data;
            commit("ADD_LIKE", like);
            resolve(response);
          })
          .then(() => {
            // Important pour maintenir le state à jour !
            postService.getAllPosts().then(function(response) {
              const posts = response.data;
              commit("GET_POSTS", posts);
              resolve(response.data);
            });
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // COMMENTAIRES ----------------------------------------------------------------------------------------------
    // Ajout d'un commentaire ---------------------------------------------------------------------------
    addComment: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        postService
          .createComment(data.id, data.data)
          .then(function(response) {
            const comment = response.data;
            commit("ADD_COMMENT", comment);
            resolve(response.data);
          })
          .then(() => {
            // Important pour maintenir le state à jour !
            postService.getAllPosts().then(function(response) {
              const posts = response.data;
              commit("GET_POSTS", posts);
              resolve(response.data);
            });
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    // Suppresion d'un commentaire précis -----------------------------------------------------------
    deleteOneComment: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        postService
          .deleteComment(id)
          .then(function(response) {
            commit("DELETE_COMMENT", id); // Le commit permet de supprimer l'élément du store
            resolve(response);
          })
          .then(() => {
            postService.getAllPosts().then(function(response) {
              const posts = response.data;
              commit("GET_POSTS", posts);
              resolve(response.data);
            });
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },
  },
});

export default store;
