<template>
  <div id="app">
    <Header /><router-view />
    <Footer />
  </div>
</template>

<script>
// Utilisaton du header et du footer pour l'ensemble de l'app
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url("../public/background.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

html, body {
  margin:0;
  padding:0;
  height:100%;
}
</style>
