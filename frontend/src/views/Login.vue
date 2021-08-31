<template>
    <div class="flex justify-center flex-col items-center py-40">
    <h1 class="text-2xl">Accédez à votre espace Groupomania</h1>
    <div id="login-form" class="flex justify-center flex-col items-center pt-6 w-80 md:w-1/3">
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
