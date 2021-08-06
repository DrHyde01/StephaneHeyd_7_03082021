<template>
    <div class="flex justify-center flex-col items-center pt-6">
    <h1 class="text-2xl">Inscription à votre espace Groupomania</h1>
    <div id="login-form" class="flex justify-center flex-col items-center pt-6 w-80 md:w-1/3">
    <signupForm />
    </div>
    </div>
</template>

<script>

// Utilisation du formulaire de connexion
import signupForm from '../components/SignupForm.vue';

export default {
    name: 'Signup',
    components: {signupForm}
}
</script>