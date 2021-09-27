<template>
    <div class="flex flex-grow justify-center flex-col items-center py-10 2xl:py-52">
    <h1 class="text-2xl text-center w-10/12">Inscription à votre espace Groupomania</h1>
    <div id="login-form" class="flex justify-center flex-col items-center pt-6 w-11/12 md:w-2/3 lg:w-1/3">
    <signupForm />
    </div>
    </div>
</template>

<script>

// Utilisation du component formulaire de connexion
import signupForm from '../components/SignupForm.vue';

export default {
    name: 'Signup',
    components: {signupForm}
}
</script>