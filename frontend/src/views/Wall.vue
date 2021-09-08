<template>
  <div class="flex justify-center w-screen py-20">
    <div class="lg:w-3/6 w-10/12 bg-white py-5 rounded-xl shadow-lg">
      <div
        class="flex space-y-8 md:space-y-2 lg:flex justify-center items-center flex-wrap m-8"
      >
        <img
          v-if="$store.state.user.picture !== null"
          class="inline object-cover rounded-full h-24 w-24 border-8 border-gray-300 shadow-md mr-4"
          :src="$store.state.user.picture"
          alt="photo de profil"
        />
        <!-- Condition à rajouter : si posts = 0 message invitant à poster, sinon garder le message ci-dessous -->
        <button
          type="button"
          class="bg-gray-100 shadow-md hover:shadow-xl px-8 py-4 rounded-full"
        >
          <p class="text-center">
            Bonjour {{ username }}. Que partagez-vous ce {{ dayName }} ?
          </p>
        </button>
      </div>

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
