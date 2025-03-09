<script setup>

</script>

<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Inicio</router-link>
      <router-link to="/profile">Perfil</router-link>
      <router-link to="/exercises">Ejercicios</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Registro</router-link>
      <router-link to="/contact">Contacto</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style>
@import "./assets/styles.css";
</style>

