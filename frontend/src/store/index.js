import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";
import authUser from "../services/auth";

// Le store fait office de middleware pour gérer les différentes actions de l'utilisateur --------------------------
const store = createStore({
  //plugins: [createPersistedState()], // Utilisation du plugin persistedstate afin de préserver le state 

  state: {},

  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
  },

  actions: {
    // Création de l'user -----------------------------------------------
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        authUser
          .signup(userInfos) // userInfos correspond aux données renseignées dans le formulaire
          .then(function(response) {
            commit("setStatus", "");
            commit("createUser", "created");
            resolve(response.data);
          })
          .catch(function(error) {
            commit("setStatus", "errorCreate");
            reject(error);
          });
      });
    },

    // Connexion de l'user ----------------------------------------------
    logToAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        authUser
          .login(userInfos) 
          .then(function(response) {
            commit("setStatus", "isConnected", "");
            resolve(response.data);
          })
          .catch(function(error) {
            commit("setStatus", "errorLogin");
            reject(error);
          });
      });
    },
  },
  modules: {},
});

export default store;
