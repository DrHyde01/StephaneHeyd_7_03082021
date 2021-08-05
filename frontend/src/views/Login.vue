<template>
    <div class="flex flex-col items-center justify-center h-screen">
    <h1>Ceci est la page de connexion</h1>
    <div id="login-form">
    <loginForm />
    </div>
    </div>
</template>

<script>

// Utilisation du formulaire de connexion
import loginForm from '../components/LoginForm.vue';

export default {
    name: 'Login',
    components: {loginForm}
}
</script>
