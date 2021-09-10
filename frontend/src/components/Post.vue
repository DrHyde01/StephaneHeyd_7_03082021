<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col  lg:mx-20 mx-0 my-4 py-4 px-4 border-2 rounded-md shadow-md"
      v-for="post in posts"
      :key="post.id"
    >
      <div class="flex items-center">
        <div class="flex items-center">
          <img
            v-if="post.User.picture !== null"
            class="inline object-cover rounded-full h-14 w-14 border-4 border-gray-300 mr-4"
            :src="post.User.picture"
            alt="photo de profil"
          />
        </div>

        <div class="flex flex-1 items-center">
          <p class="text-center font-medium text-gray-600">
            {{ post.User.username }}
          </p>
          <StatusOnlineIcon
            v-if="$store.state.user.userId == post.User.id"
            class=" h-6 w-6 ml-1 text-green-400"
          />
          <p class="text-xs font-thin ml-2">
            {{ moment(post.createdAt).format("[le] DD MMMM YYYY") }}
          </p>
        </div>

        <!-- Si l'user est le propriétaire du post ou l'admin on l'autorise la modification ou la suppresion -->
        <div
          class="flex flex-2 items-center justify-center"
          v-if="
            $store.state.user.userId == post.User.id ||
              $store.state.user.isAdmin == true
          "
        >
          <button type="button">
            <PencilIcon
              class="h-6 w-5 mr-4 text-gray-400 hover:text-gray-800"
            />
          </button>
          <button type="button" @click="deletePost(post.id)">
            <TrashIcon class="h-6 w-5 mr-2 text-gray-400 hover:text-red-600" />
          </button>
        </div>
      </div>

      <div
        v-if="post.imageURL !== null"
        class="flex justify-center border my-4 max-h-80"
      >
        <img class="inline object-cover" :src="post.imageURL" />
      </div>

      <div
        v-if="post.link !== null"
        class="flex justify-center border my-4 max-h-80"
      >
        <img class="inline object-cover" :src="post.link" />
      </div>

      <div class="flex flex-wrap mx-4 my-2">
        <p class="text-left">{{ post.message }}</p>
      </div>

      <!-- Affichage du bouton like et du compteur : intégrer un bouton coeur permettant de liker ou d'annuler son like -->

      <!-- Affichage des commentaires et du compteur : intégrer un bouton permettant de les afficher -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

import { PencilIcon, TrashIcon, StatusOnlineIcon } from "@heroicons/vue/solid";

export default {
  name: "Posts",

  components: { PencilIcon, TrashIcon, StatusOnlineIcon },

  created: function() {
    this.moment = moment; // Permet le formatage de la date du post
    moment.locale("fr");
  },

  computed: {
    ...mapState({ posts: (state) => state.posts }), // On map les posts disponibles dans le store
  },

  methods: {
    deletePost(id) {
      this.$store.dispatch("deleteOnePost", id);
    },
  },
};
</script>

<style></style>
