<template>
  <transition name="modal-fade">
    <div class="fixed bottom-0 inset-x-0 flex" @click.stop>
      <div class="fixed inset-0 transition-opacity">
        <div
          class="absolute overflow-y-auto inset-0 bg-gray-200 backdrop-filter backdrop-blur-md bg-opacity-40 "
        >
          <div
            class="relative z-10 bg-white shadow-xl rounded-xl py-10 px-8 flex flex-col w-4/5 lg:w-1/3 my-40 mx-auto"
            role="dialog"
            aria-modal="true"
            aria-label="modal création de post"
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
            <h2 class="flex-start text-xl mb-6">Créer un post</h2>

            <form>
              <div>
                <textarea
                  v-model="message"
                  class="w-full rounded-md p-2 mb-6 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
                  type="text"
                  placeholder="Votre message"
                  aria-label="Ecrire un message"
                />

                <p class="text-sm font-thin italic text-left mb-6">
                  La publication doit contenir au moins un message, qui peut
                  être agrémenté par une image issue d'un fichier, ou d'un
                  lien.<br />
                  Les images doivent utiliser les formats suivants : .jpeg,
                  .png, .gif
                </p>

                <input
                  @change="uploadFile"
                  ref="file"
                  name="image"
                  class="w-full rounded-md p-2 mb-6 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  aria-label="Rajouter un fichier"
                />

                <input
                  v-model="link"
                  class="w-full rounded-md p-2 mb-6 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
                  type="text"
                  placeholder="Votre lien"
                  aria-label="Rajouter un lien"
                />
              </div>

              <div class="flex justify-center">
                <button
                  type="button"
                  @click="
                    submitPost();
                    close();
                  "
                  class=" bg-gray-500 hover:bg-gray-600 rounded-md hover:shadow-xl text-white font-bold py-2 px-4  mx-20"
                  :disabled="!validatedFields"
                  :class="{ 'opacity-25 cursor-not-allowed': !validatedFields }"
                >
                  <span v-if="messages == 'Post publié !'"
                    >Publication en cours...</span
                  >
                  <span v-else>Publier</span>
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
  name: "postModal",

  components: { XCircleIcon },

  data: function() {
    return {
      message: "",
      file: null,
      link: null,
    };
  },

  computed: {
    validatedFields: function() {
      if (this.message != "") {
        return true;
      } else {
        return false;
      }
    },

    ...mapState({ messages: (state) => state.message }),
  },

  methods: {
    uploadFile() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },

    submitPost: function() {
      const formData = new FormData(); // Permet de transmettre le formulaire dans un format adapté au backend

      formData.append("message", this.message);

      if (this.link !== null) {
        formData.append("link", this.link);
      }
      if (this.file !== null) {
        formData.append("image", this.file);
      }
      this.$store.dispatch("createPost", formData);
    },

    resetForm() {
      // Permet de reset le formulaire
      this.message = "";
      this.link = null;
      this.$refs.file.value = null;
    },

    close() {
      this.$emit("close");
      this.resetForm(); // Reset du formulaire à la fermeture de la modal
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
