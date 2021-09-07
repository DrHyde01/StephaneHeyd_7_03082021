<template>
  <div class="flex justify-center w-screen py-20">
    <div class="lg:w-3/6 w-10/12 bg-white py-5 rounded-xl shadow-lg">
      <p class="text-center mb-10">
        Bonjour {{ username }}. Que voulez vous partager ce {{ dayName }} ?
      </p>

      <postCreate />

      <postView />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import postCreate from "../components/PostCreation.vue";
import postView from "../components/Post.vue";

export default {
  name: "Wall",
  components: { postCreate, postView },

  beforeMount() {
    // On demande les informations de l'user ainsi que les posts disponibles avant le rendu
    this.$store.dispatch("getUserInfos");
    this.$store.dispatch("getAllPosts");
  },

  computed: {
    ...mapState({ username: (state) => state.user.username }), // Récuparation du nom de l'user connecté

    dayName() {
      // Récupération du jour actuel
      const dateObj = new Date();
      const weekday = dateObj.toLocaleString("fr-FR", { weekday: "long" });
      return `${weekday}`;
    },
  },
};
</script>
