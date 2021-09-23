<template>
  <div class="shadow-md bg-gray-50 rounded-xl p-10 w-full">
    <form>
      <div>
        <input
          v-model="firstName"
          class="w-full p-2 mb-6 rounded-md border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Votre nom"
        />
        <input
          v-model="lastName"
          class="w-full p-2 mb-6 rounded-md border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Votre prénom"
        />
        <input
          v-model="username"
          class="w-full p-2 mb-6 rounded-md border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Un pseudo"
        />
        <input
          v-model="email"
          class="w-full p-2 mb-6 rounded-md border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Votre adresse mail"
        />
        <input
          v-model="password"
          class="w-full p-2 mb-6 rounded-md border-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          type="password"
          placeholder="Un mot de passe"
        />
      </div>
      <div>
        <button
          type="button"
          @click="createAccount()"
          class="w-full rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-xl text-white font-bold py-2 px-4 "
          :disabled="!validatedFields"
          :class="{ 'opacity-25 cursor-not-allowed': !validatedFields }"
        >
          <!-- Au click l'intitulé du bouton change -->
          <span v-if="status == 'loading'">Création du compte en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
      <!-- Un message d'erreur apparaît si le formulaire n'est pas valide -->
      <div>
        <p v-if="status == 'error'" class="p-2 text-center text-red-400">
          Inscription impossible, veuillez vérifier les informations
          renseignées.
        </p>
      </div>
    </form>

    <div class="mt-6">
      <p class=" text-sm text-center italic font-thin">
        Veillez à remplir l'ensemble des informations demandées.
      </p>
      <p class=" text-sm text-center italic font-thin">
        Le mot de passe doit contenir au minimum 8 caractères, au moins une
        majuscule, une minuscule, et un chiffre. Il ne doit pas contenir
        d'espaces.
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; // mapState nous permet de récupérer des propriétés de state du store

export default {
  name: "signupForm",

  data: function() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
  },

  computed: {
    // Fonction qui va permettre de désactiver le bouton d'inscription si les champs ne sont pas remplis
    validatedFields: function() {
      if (
        this.firstName != "" &&
        this.lastName != "" &&
        this.username != "" &&
        this.email != "" &&
        this.password != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]), // On souhaite récupérer les stats status du store
  },

  methods: {
    createAccount: function() {
      const self = this; // Afin d'utiliser this dans un autre contexte
      this.$store
        .dispatch("createAccount", {
          // On propage l'action createAccount du store avec l'objet présent
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(
          function() {
            self.$router.push('/login'); // Puis on retourne sur la page login afin de se connecter
          },
          function(error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style></style>
