<template>
  <div class="shadow-md bg-gray-100 rounded-xl p-10 w-full">
    <form>
      <div>
        <input
          v-model="username"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Votre pseudo"
        />
        <input
          v-model="password"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          type="password"
          placeholder="Votre mot de passe"
        />
      </div>
      <div>
        <button
          type="button"
          @click="logToAccount()"
          class="w-full bg-gray-500 hover:bg-gray-600 hover:shadow-xl text-white font-bold py-2 px-4 rounded"
          :disabled="!validatedFields"
          :class="{ 'opacity-25 cursor-not-allowed': !validatedFields }"
        >
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
      </div>
      <div>
        <p v-if="status == 'errorLogin'" class="p-2 text-center text-red-400"> Identifiant ou mot de passe incorrect.</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex"; // mapState nous permet de récupérer des propriétés de state du store

export default {
  name: "loginForm",

  data: function() {
    return {
      username: "",
      password: "",
    };
  },

  computed: {
    // Fonction qui va permettre de désactiver le bouton connexion si les champs ne sont pas remplus
    validatedFields: function() {
      if (this.usermane != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]), // On souhaite récupérer les stats status du store 
  },

  methods: {
    logToAccount: function() {
      const self = this;
      this.$store
        .dispatch("logToAccount", {
          // On propage l'action createAccount du store avec l'objet présent
          username: this.username,
          password: this.password,
        })
        .then(
          function() {
            self.$router.push('/wall'); // Puis on bascule sur la page wall
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
