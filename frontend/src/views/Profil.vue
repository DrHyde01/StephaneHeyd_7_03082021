<template>
  <div class="flex justify-center w-screen py-20">
    <div class="lg:w-3/6 w-10/12 bg-white py-5 rounded-xl shadow-lg">
      <div class="flex justify-end">
        <div class="flex">
          <button
            type="button"
            title="Modifier votre profil"
            @click="displayModal"
          >
            <PencilIcon
              class="h-8 w-8 mr-8 text-gray-300 hover:text-gray-600"
            />
          </button>
          <modify-user v-show="modifyUser" @close="closeModal" />
          <button
            type="button"
            title="Supprimer votre profil"
            @click="deleteUser(user.userId)"
          >
            <TrashIcon class="h-8 w-8 mr-4 text-red-400 hover:text-red-600" />
          </button>
        </div>
      </div>
      <div
        class="flex flex-col space-y-8 md:space-y-12 lg:flex justify-center items-center flex-wrap mb-8 mx-8"
      >
        <div class="flex flex-col items-center">
          <img
            v-if="user.picture !== null"
            class="inline object-cover rounded-full h-40 w-40 border-8 border-gray-300 shadow-md"
            :src="user.picture"
            alt="photo de profil"
          />
          <h1 class="font-bold text-3xl text-gray-600 p-4">
            {{ user.username }}
          </h1>
          <p class="text-xl pb-4 text-center">
            {{ user.lastName }} {{ user.firstName }}
          </p>
          <p class="text-sm font-thin italic">
            Membre depuis le
            {{ moment(user.birth).format("[le] DD MMMM YYYY") }}
          </p>
        </div>
      </div>
      <div class="flex flex-col m-6 md:m-12 space-y-4">
        <div class="flex items-center">
          <MailIcon class="h-6 w-6 mr-2 text-gray-600" />
          <p class="font-light">{{ user.email }}</p>
        </div>
        <div class="flex items-center">
          <ChatIcon class="h-6 w-6 mr-2 text-gray-600" />
          <p class="font-light">A propos</p>
        </div>
        <div class="mx-8">
          <p class="font-light pl-2 border-l-2 border-gray-600 ">
            {{ user.description }}
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
import {
  PencilIcon,
  MailIcon,
  ChatIcon,
  TrashIcon,
} from "@heroicons/vue/solid";

export default {
  name: "Profil",
  components: { modifyUser, PencilIcon, MailIcon, ChatIcon, TrashIcon },

  data: () => ({
    modifyUser: false, // La modale ne doit pas d'afficher initialement
  }),

  beforeMount() {
    this.$store.dispatch("getUserInfos");
  },
  created: function() {
    this.moment = moment; // Permet le formatage de la date du post
    moment.locale("fr");
  },

  methods: {
    displayModal() {
      this.modifyUser = true;
      this.$router.push("/profil/modify");
    },

    closeModal() {
      this.modifyUser = false;
      this.$router.push("/profil");
    },

    deleteUser(id) {
      this.$store.dispatch("deleteOneUser", id);
      this.$store.dispatch("logOut").then(() => {
        this.$router.push("/login");
      });
    },
  },

  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
};
</script>
