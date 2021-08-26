// Ce fichier permet la liaison frontend - backend pour la gestion des users -----------------------------
import axios from "axios";
import store from "../store/index";

const API_URL = "http://localhost:3000/api/"; // Le chemin de notre API ------------------------------

export default () => {
  // Paramètres généraux qui seront utilisés par Axios -------------------------------
  return axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${store.state.token}`, // Récupération du token à partir du store
    },
  });
};
