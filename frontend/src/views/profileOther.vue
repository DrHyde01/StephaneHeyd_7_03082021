<template>
  <div class="flex justify-center w-screen py-20">
    <div class="lg:w-3/6 w-10/12 bg-white py-5 rounded-xl shadow-lg">
      <div class="flex justify-end mr-4">
        <button
          v-if="
            $store.state.user.userId == users.id ||
              $store.state.user.isAdmin == true
          "
          type="button"
          title="Modifier votre profil"
          @click="modifyUser()"
        >
          <PencilIcon class="h-8 w-8 mr-4 text-gray-300 hover:text-gray-600" />
        </button>
        <modifyModal v-show="showModal" @close="closeModifyProfile" />
      </div>
      <div
        class="flex flex-col space-y-8 md:space-y-12 lg:flex justify-center items-center flex-wrap mb-8 mx-8"
      >
        <div class="flex flex-col items-center">
          <img
            v-if="users.picture !== null"
            class="inline object-cover rounded-full h-40 w-40 border-8 border-gray-300 shadow-md"
            :src="users.picture"
            alt="photo de profil"
          />
          <h1 class="font-bold text-3xl text-gray-600 p-4">
            {{ users.username }}
          </h1>
          <p class="text-xl pb-4 text-center">
            {{ users.lastName }} {{ users.firstName }}
          </p>
          <p class="text-sm font-thin italic">
            Membre depuis le
            {{ moment(users.createdAt).format("[le] DD MMMM YYYY") }}
          </p>
        </div>
      </div>
      <div class="flex flex-col m-6 md:m-12 space-y-4">
        <div class="flex items-center">
          <MailIcon class="h-6 w-6 mr-2 text-gray-600" />
          <p class="font-light">{{ users.email }}</p>
        </div>
        <div class="flex items-center">
          <ChatIcon class="h-6 w-6 mr-2 text-gray-600" />
          <p class="font-light">A propos</p>
        </div>
        <div class="mx-8">
          <p class="font-light pl-2 border-l-2 border-gray-600 ">
            {{ users.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import modifyUser from "../components/UserModifyModal.vue";
import { PencilIcon, MailIcon, ChatIcon } from "@heroicons/vue/solid";

export default {
  name: "Profil",
  components: { modifyUser, PencilIcon, MailIcon, ChatIcon },

  data: () => ({
    showModal: false, // La modale ne doit pas d'afficher initialement
  }),

  beforeMount() {
    this.$store.dispatch("getOtherUser", this.$route.params.id); // On récupére les infos de l'user en fonction de l'id de l'URL
  },

  created: function() {
    this.moment = moment; // Permet le formatage de la date du post
    moment.locale("fr");
  },

  computed: {
    ...mapState({
      users: (state) => state.users, // On map les infos user récupérées avec le dispatch
    }),
  },
};
</script>
