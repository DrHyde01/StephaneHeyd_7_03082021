<template>
  <div id="nav"> <!-- Liens vers nos pages enregistrées dans le routeur -->
    <router-link to="/login">Connexion</router-link> |
    <router-link to="/signup">Signup</router-link> |
    <router-link to="/wall">Mur</router-link> |
    <router-link to="/profil">Profil</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
