<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem("token"));

const logout = () => {
  localStorage.removeItem("token");
  isAuthenticated.value = false;
  router.push('/login');
};
</script>

<template>
  <nav class="navbar">
    <router-link to="/">Inicio</router-link>
    <router-link v-if="isAuthenticated" to="/profile">Perfil</router-link>
    <router-link v-if="isAuthenticated" to="/exercises">Ejercicios</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <router-link v-if="!isAuthenticated" to="/register">Registro</router-link>
    <router-link to="/contact">Contacto</router-link>
    <button v-if="isAuthenticated" @click="logout" class="logout-btn">Cerrar sesión</button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1rem;
  background-color: #333;
  padding: 1rem;
}

.navbar a {
  color: #fff;
  text-decoration: none;
}

.logout-btn {
  background: #a00;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}
</style>
