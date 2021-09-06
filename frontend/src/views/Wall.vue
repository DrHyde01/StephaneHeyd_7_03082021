<template>
  <div class="flex justify-center w-screen py-60">
    <div class="w-3/4 bg-white py-5 rounded-xl shadow-lg">
      <p class="text-center">
        Bonjour {{ username }}. Que voulez vous partager ce {{ dayName }} ?
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Wall",
  components: {},

  beforeMount() {
    // On demande les informations de l'user ainsi que les posts disponibles avant le rendu
    this.$store.dispatch("getUserInfos");
    this.$store.dispatch("getAllPosts");
  },

  computed: {
    ...mapState({ username: (state) => state.user.username }), // Récuparation du nom de l'user connecté

    dayName() { // Récupération du jour actuel
      const dateObj = new Date()
      const weekday = dateObj.toLocaleString("fr-FR", { weekday: "long" });
      return `${weekday}`
    },
  },
};
</script>
