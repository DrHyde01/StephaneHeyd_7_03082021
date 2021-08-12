<template>
  <div class="header">
    <nav
      class="flex items-center justify-between flex-wrap bg-gray-600 h-16 pl-8 pr-8"
    >
      <!-- Liens vers nos pages enregistrées dans le routeur -->
      <div class="flex flex-start">
        <router-link to="/">
          <img
            class="object-contain h-10"
            src="../assets/icons/icon-white-navbar.png"
          />
        </router-link>
      </div>
      <div class="flex flex-end">
        <!-- S'affiche uniquement si l'utilisateur est connecté -->
        <template v-if="status == 'isConnected'">
          <router-link to="/wall" class="text-white hover:text-pink-300 mx-3"
            >Mur</router-link
          >
          <router-link to="/profil" class="text-white hover:text-pink-300 mx-3"
            >Profil</router-link
          >
          <router-link to="/" class="text-white hover:text-pink-300 mx-3"
            >Déconnexion</router-link
          >
        </template>

        <!-- S'affiche uniquement si l'utilisateur n'est pas connecté ou déconnecté-->
        <template v-else>
          <router-link to="/login" class="text-white hover:text-pink-300 mx-3"
            >Connexion</router-link
          >
          <router-link to="/signup" class="text-white hover:text-pink-300 mx-3"
            >Inscription</router-link
          >
        </template>

      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex"; // Nous avons besoin d'une valeur du store Vuex pour gérer afficher des élements du header

export default {
  name: "Header",

  computed: {
    ...mapState(["status"]), // Le statut "ifConnected" sera recherché dans le store
  }
};


</script>


<style></style>
