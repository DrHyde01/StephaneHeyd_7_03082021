<template>
  <div class="shadow-md bg-gray-100 rounded-xl p-10 w-full">
    <form @submit="handleSignup">
      <div>
        <input
          v-model="firstName"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none"
          type="text"
          placeholder="Votre nom"
        />
        <input
          v-model="lastName"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none"
          type="text"
          placeholder="Votre prénom"
        />
        <input
          v-model="username"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none"
          type="text"
          placeholder="Un pseudo"
        />
        <input
          v-model="email"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none"
          type="text"
          placeholder="Votre adresse mail"
        />
        <input
          v-model="password"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none"
          type="password"
          placeholder="Un mot de passe"
        />
      </div>
      <div>
        <button
          @click="createAccount()"
          class="w-full bg-gray-500 hover:bg-gray-600 hover:shadow-xl text-white font-bold py-2 px-4 rounded"
          :disabled="!validatedFields"
          :class="{ 'opacity-25 cursor-not-allowed': !validatedFields }"
        >
          Inscription
        </button>
      </div>
    </form>

    <div class="mt-6">
      <p class=" text-sm italic font-thin">
        Veillez à remplir l'ensemble des informations demandées.
      </p>
      <p class=" text-sm italic font-thin">
        Le mot de passe doit contenir au minimum 8 caractères, au moins une
        majuscule, une minuscule, et un chiffre. Il ne doit pas contenir
        d'espaces.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signupForm',

  data: function() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    };
  },

  computed: {
    // Fonction qui va permettre de désactiver le bouton d'inscription si les champs ne sont pas remplis
    validatedFields: function() {
      if (
        this.firstName != '' &&
        this.lastName != '' &&
        this.username != '' &&
        this.email != '' &&
        this.password != ''
      ) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    createAccount: function() {
      console.log(this.firstName, this.lastName, this.username, this.email, this.password);
    },
  },
};
</script>

<style></style>
