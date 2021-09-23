<template>
  <nav
    :class="{ scrolled: !view.atTopOfPage }"
    class="sticky shadow-lg w-full flex items-center justify-center md:justify-between flex-wrap bg-gray-800 h-24 md:h-16 mt-0 pl-8 pr-8 top-0 z-10 animated
       backdrop-filter backdrop-blur-md bg-opacity-40 border-b border-gray-200"
  >
    <!-- Liens vers nos pages enregistrées dans le routeur -->
    <div class="flex flex-start">
      <router-link v-if="status == 'isConnected'" to="/wall">
        <img
          class="object-contain h-10"
          src="../assets/icons/icon-white-navbar.png"
          alt="Groupomania logo"
        />
      </router-link>
      <router-link v-else to="/">
        <img
          class="object-contain h-10"
          src="../assets/icons/icon-white-navbar.png"
          alt="Groupomania logo"
        />
      </router-link>
    </div>
    <div class="flex w-full justify-around md:w-max flex-end">
      <!-- S'affiche uniquement si l'utilisateur est connecté -->
      <template v-if="status == 'isConnected'">
        <router-link to="/wall" class="text-white font-semibold hover:text-pink-600 mx-3"
          >Mur</router-link
        >
        <router-link to="/profil" class="text-white font-semibold hover:text-pink-600 mx-3"
          >Profil</router-link
        >
        <router-link
          to="/login"
          @click="logOut()"
          class="text-white font-extrabold hover:text-red-600 mx-3"
          >Déconnexion</router-link
        >
      </template>

      <!-- S'affiche uniquement si l'utilisateur n'est pas connecté ou déconnecté-->
      <template v-else>
        <router-link to="/login" class="text-white font-semibold hover:text-pink-600 mx-3"
          >Connexion</router-link
        >
        <router-link to="/signup" class="text-white font-semibold hover:text-pink-600 mx-3"
          >Inscription</router-link
        >
      </template>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex"; // Nous avons besoin d'une valeur du store Vuex pour gérer afficher des élements du header

export default {
  name: "Header",

  data() {
    return {
      view: {
        atTopOfPage: true,
      },
    };
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll); // On écoute l'évènement scroll
  },

  computed: {
    ...mapState(["status"]), // Le statut "isConnected" sera recherché dans le store

     userConnected () { // Permet de faire pointer le router vers l'id de l'utilisateur courant
      return this.$store.state.user.userId 
    }
  },

  methods: {
    handleScroll() {
      // Cette méthode s'active lors du scroll
      if (window.pageYOffset > 0) {
        if (this.view.atTopOfPage) this.view.atTopOfPage = false;
      } else {
        if (!this.view.atTopOfPage) this.view.atTopOfPage = true;
      }
    },

    logOut: function() {
      // Retour sur la page de connexion après la déconnexion
      this.$store.dispatch("logOut").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
nav {
  z-index: 10;
}

nav.scrolled {
  /* Styles appliqués à la navbar lors du scroll */
  @apply shadow-2xl;
  border-bottom: 0px;
}
</style>
