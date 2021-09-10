<template>
  <div class="fixed bottom-0 inset-x-0 flex" @click.stop>
    <div class="fixed inset-0 transition-opacity">
      <div
        class="absolute inset-0 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-30 "
      >
        <div
          class="z-10 bg-white shadow-xl rounded-xl py-10 px-8 flex flex-col w-4/5 lg:w-1/3 my-40 mx-auto"
          role="dialog"
          aria-modal="true"
          aria-label="modal création de post"
        >
          <h2 class="flex-start text-xl mb-6">Créer un post</h2>

          <div>
            <textarea
              v-model="message"
              class="w-full p-2 mb-6 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
              type="text"
              placeholder="Ecrivez votre message"
              aria-label="Ecrire un message"
            />

            <p class="font-thin text-left mb-6">
              Pour agrémenter votre message vous pouvez rajouter une image à
              partir d'un fichier, ou d'un lien 🙂
            </p>

            <input
              @change="uploadFile"
              label
              for="image"
              class="w-full p-2 mb-6 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
              type="file"
              accept="image/png, image/jpeg, image/gif"
              ref="file"
              placeholder="Votre fichier"
              aria-label="Rajouter un fichier"
            />

            <input
              v-model="link"
              class="w-full p-2 mb-6 border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
              type="text"
              placeholder="Votre lien"
              aria-label="Rajouter un lien"
            />
          </div>

          <button
            type="button"
            @click="
              submitPost();
              $emit('close');
            "
            class=" bg-gray-500 hover:bg-gray-600 hover:shadow-xl text-white font-bold py-2 px-4 rounded mx-16"
          >
            <span>Publier</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postModal",

  data: function() {
    return {
      message: "",
      imageURL: "",
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
      this.$store.dispatch("createPost", formData).then(function() {
        self.$router.push("/wall");
      });
    },
  },
};
</script>
