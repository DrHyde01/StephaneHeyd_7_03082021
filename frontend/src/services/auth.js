import API from "./apiService";

export default {
    signup(data) {
        return API().post('auth/signup', data);
    },

    login(data) {
        return API().post('auth/login', data);
    }
}