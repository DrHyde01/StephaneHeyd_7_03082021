<template>
  <transition name="modal-fade">
    <div class="fixed bottom-0 inset-x-0 flex" @click.stop>
      <div class="fixed inset-0 transition-opacity">
        <div
          class="absolute overflow-y-auto inset-0 bg-gray-200 backdrop-filter backdrop-blur-md bg-opacity-40"
        >
          <div
            class="relative z-10 bg-white shadow-xl rounded-xl py-10 px-8 flex flex-col justify-center items-center w-4/5 lg:w-1/3 my-40 mx-auto"
            role="dialog"
            aria-modal="true"
            aria-label="modal modification de post"
          >
            <div>
              <button
                type="button"
                @click="close"
                class="absolute -top-4 -right-4"
              >
                <XCircleIcon
                  class="h-10 w-10  text-pink-500 hover:text-pink-600"
                />
              </button>
            </div>
            <h2 class="flex-start text-xl mb-6">Modifier un profil</h2>

            <form>
              <div>
                <textarea
                  v-model="username"
                  class="w-full rounded-md h-12 p-2 mb-2 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
                  type="text"
                  placeholder="Nom d'utilisateur"
                  aria-label="Changer nom d'utilisateur"
                />
              </div>

              <div>
                <textarea
                  v-model="description"
                  class="w-full rounded-md h-40 p-2 mb-2 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
                  type="text"
                  placeholder="A propos de vous"
                  aria-label="Changer de description"
                />
              </div>

              <span class="text-sm font-thin mb-2"
                >Modifier votre photo de profil</span
              >
              <input
                @change="uploadFile"
                ref="file"
                label
                for="image"
                name="image"
                class="w-full rounded-md p-2 mb-6 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
                type="file"
                accept="image/png, image/jpeg, image/gif"
                aria-label="Changer la photo de profil"
              />

              <div class="flex justify-center">
                <button
                  type="button"
                  @click="
                    updateProfil();
                    close();
                  "
                  class=" bg-gray-500 hover:bg-gray-600 rounded-md hover:shadow-xl text-white font-bold py-2 px-4  mx-20"
                  :disabled="!validatedFields"
                  :class="{ 'opacity-25 cursor-not-allowed': !validatedFields }"
                >
                  <span v-if="messages == 'Post modifié !'"
                    >Modification en cours...</span
                  >
                  <span v-else>Modifier</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { XCircleIcon } from "@heroicons/vue/solid";
import { mapState } from "vuex";

export default {
  name: "modifyModal",

  components: { XCircleIcon },

  data: function() {
    return {
      username: "",
      email: "",
      description: "",
      file: null,
    };
  },

  computed: {
    ...mapState({
      messages: (state) => state.message,
      user: (state) => state.user,
    }),

    validatedFields: function() {
      if (
        this.username !== "" ||
        this.description !== "" ||
        this.file !== null
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    uploadFile() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },

    updateProfil: function() {
      // Même schéma que pour la création des posts, mis à part que le payload comporte l'id du post en plus du data

      let id = this.$store.state.user.userId;

      let formData = new FormData();

      if (this.username !== "") {
        formData.append("username", this.username);
      }

      if (this.description !== "") {
        formData.append("description", this.description);
      }
      if (this.file !== null) {
        formData.append("image", this.file);
      }

      this.$store.dispatch("updateUserInfos", {
        id: id,
        data: formData,
      });
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
</style>
