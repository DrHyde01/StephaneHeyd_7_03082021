<template>
  <div id='app'>
    <Header /><router-view />
  </div>
</template>

<script>
// Utilisaton du header pour l'ensemble de l'app
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {Header}
};
</script>

<style>
</style>
