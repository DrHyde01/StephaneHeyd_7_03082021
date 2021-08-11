import apiConfig from "./apiService";

export default {
    signup(data) {
        return apiConfig().post('auth/signup', data);
    },

    login(data) {
        return apiConfig().post('auth/login', data);
    }
}