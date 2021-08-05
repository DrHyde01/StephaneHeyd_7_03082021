<template>

<div class="shadow-md bg-gray-100 rounded p-10"> 
<form>
   <div>
    <label class="block mb-2 text-blue-500" for="username">Votre adresse mail</label>
    <input class="w-full p-2 mb-6 text-blue-500 border-b-2 border-blue-500 outline-none" type="text" name="username">
  </div>
  <div>
    <label class="block mb-2 text-blue-500" for="password">Votre mot de passe</label>
    <input class="w-full p-2 mb-6 text-black border-b-2 border-blue-500 outline-none" type="password" name="password">
  </div>
  <div>          
    <input class="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">
  </div>       
</form>
</div>

</template>

<script>
export default {
    name: 'loginForm',
};
</script>

<style>
</style>