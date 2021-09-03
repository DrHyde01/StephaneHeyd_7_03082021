<template>
    <div>
    <p>Ceci sera le mur où les articles seront affichés, avec la possibilité d'en poster</p>
    </div>
</template>

<script>

export default {
    name: 'Wall',
    components: {},

    created(){ // On demande les informations de l'user ainsi que les posts disponibles avant le rendu
    this.$store.dispatch("getUserInfos");
    this.$store.dispatch("getAllPosts");
 },



}





</script>