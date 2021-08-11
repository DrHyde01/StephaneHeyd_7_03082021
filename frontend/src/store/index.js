import { createStore } from "vuex";
import authUser from "../services/auth";

const store = createStore({
  state: {},
  mutations: {},
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit;
      authUser.signup(userInfos)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        });
    },

    logAccount: ({ commit }, userInfos) => {
      commit;
      authUser.login(userInfos)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
  modules: {},
});

export default store;
