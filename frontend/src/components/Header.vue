<template>
  <div class="header">
    <nav class="flex items-center justify-around flex-wrap bg-gray-600 h-16">
      <!-- Liens vers nos pages enregistrées dans le routeur -->
      <router-link to="/home"> 
        <img class="object-contain h-10" src="../assets/icons/icon-white-navbar.png" />
      </router-link>
      <router-link to="/login" class="text-white hover:text-blue-400">Connexion</router-link>
      <router-link to="/signup" class="text-white hover:text-blue-400">Inscription</router-link>
      <router-link to="/wall" class="text-white hover:text-blue-400">Mur</router-link>
      <router-link to="/profil" class="text-white hover:text-blue-400">Profil</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
</style>
