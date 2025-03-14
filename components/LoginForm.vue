<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

const email = ref('');
const password = ref('');
const errors = ref({});
const errorMessage = ref('');
const router = useRouter();

const validateForm = () => {
  errors.value = {};

  if (!email.value) {
    errors.value.email = "El email es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = "El email no es válido.";
  }

  if (!password.value) {
    errors.value.password = "La contraseña es obligatoria.";
  } else if (password.value.length < 6) {
    errors.value.password = "Mínimo 6 caracteres.";
  }

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const response = await login({ email: email.value, password: password.value });

    localStorage.setItem("token", response.data.token);
    router.push('/profile');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Error en las credenciales.";
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="input-group">
      <label>Email</label>
      <input type="email" v-model="email" required />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div class="input-group">
      <label>Contraseña</label>
      <input type="password" v-model="password" required />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>

    <button type="submit" class="button">Entrar</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>
