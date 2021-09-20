import API from "./apiService";

export default {
  signup(data) {
    return API().post("users/auth/signup", data);
  },

  login(data) {
    return API().post("users/auth/login", data);
  },

  getAllUsers() {
    return API().get("users/accounts");
  },

  getUser(id) {
    return API().get("users/accounts/" + id);
  },

  updateUser(id, data) {
    return API().put("users/accounts" + id, data);
  },

  deleteUser(id) {
    return API().delete("users/accounts" + id);
  },
};
