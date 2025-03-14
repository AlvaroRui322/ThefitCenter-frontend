<script setup>
import { useRouter } from 'vue-router'
import {useUserStore} from "./stores/user.js";

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Inicio</router-link>

      <template v-if="userStore.isLoggedIn">
        <router-link to="/profile">Perfil</router-link>
        <router-link to="/exercises">Ejercicios</router-link>
        <button @click="handleLogout" class="button">Cerrar Sesión</button>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Registro</router-link>
      </template>

      <router-link to="/contact">Contacto</router-link>
    </nav>

    <router-view />
  </div>
</template>


<style>
@import "./assets/styles.css";
</style>

