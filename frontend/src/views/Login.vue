<template>
    <div class="flex justify-center flex-col items-center py-40 2xl:py-56">
    <h1 class="text-2xl text-center w-10/12">Accédez à votre espace Groupomania</h1>
    <div id="login-form" class="flex justify-center flex-col items-center pt-6 w-11/12 md:w-2/3 lg:w-1/3">
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
