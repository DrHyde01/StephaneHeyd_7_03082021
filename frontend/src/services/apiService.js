// Ce fichier permet la liaison frontend - backend pour la gestion des users -----------------------------
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/'; // Le chemin de notre API ------------------------------


export default {
  async createUser() {
    let res = await axios.post(API_URL +"/signup");
    return res.data;
  },

  async logUser() {
    let res = await axios.post(API_URL +"/login");
    return res.data;
  },

}
