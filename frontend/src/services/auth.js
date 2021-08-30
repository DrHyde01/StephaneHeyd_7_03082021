import API from "./apiService";

export default {
    signup(data) {
        return API().post('users/auth/signup', data);
    },

    login(data) {
        return API().post('users/auth/login', data);
    }
}