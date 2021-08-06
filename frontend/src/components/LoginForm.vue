<template>
  <div class="shadow-md bg-gray-100 rounded-xl p-10 w-full">
    <form>
      <div>
        <input
          v-model="mail"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none"
          type="text"
          placeholder="Votre adresse mail"
        />
        <input
          v-model="password"
          class="w-full p-2 mb-6 border-b-2 border-gray-400 outline-none"
          type="password"
          placeholder="Votre mot de passe"
        />
      </div>
      <div>
        <button
          type="submit"
          class="w-full bg-gray-500 hover:bg-gray-600 hover:shadow-xl text-white font-bold py-2 px-4 rounded"
          :disabled="!validatedFields"
          :class="{ 'opacity-25 cursor-not-allowed': !validatedFields }"
        >
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "loginForm",

  data: function () {
    return {
      email: "",
      password: ""
    }
  },
  
  computed: {
    // Fonction qui va permettre de désactiver le bouton connexion si les champs ne sont pas remplus
    validatedFields: function() {
      if (this.email != '' && this.password != '') {
        return true;
      }
      else {
        return false;
      }
    }
  }
};
</script>

<style></style>
