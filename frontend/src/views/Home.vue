<template>
  <div
    class="flex justify-center flex-col items-center py-10"
  >
    <h1 class="text-4xl">Bienvenue ! 👋</h1>
    <div
      class="flex justify-center flex-col items-center rounded-xl shadow-lg bg-gray-50 mt-6 p-5 w-80 md:w-1/2"
    >
      <img
        class="object-contain rounded-full shadow-xl w-1/3"
        src="../assets/icons/icon.png"
        alt="logo groupomania"
      />
      <p class="text-base text-center p-5">
        Groupomania est heureux de vous présenter son réseau social.<br />
        Nous avons mis en place cette plateforme afin que vous puissiez échanger
        entre collaborateurs sur divers sujets, et suivre toutes les actualités
        de notre groupe.<br />
        Pour cela il suffit de vous connecter, ou de vous inscrire si cela n'est
        pas encore fait 🙂
      </p>
      <button
        @click="toLogin()"
        class="bg-gray-500 hover:bg-gray-600 hover:shadow-xl text-white font-bold py-2 px-4 rounded"
      >
        Déjà inscrit ?
      </button>
      <button
        @click="toSignup()"
        class="bg-pink-500 hover:bg-pink-600 hover:shadow-xl text-white font-bold py-2 px-4 mt-6 rounded"
      >
        S'inscrire
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    // Utilisation d'instances router pour créer des ancres
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toSignup() {
      this.$router.push({ path: "/signup" });
    },
  },
};
</script>
