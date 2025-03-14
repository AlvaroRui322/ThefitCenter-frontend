<script setup>
import { ref } from 'vue';
import { register } from '../services/authService';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref({});
const successMessage = ref('');
const errorMessage = ref('');

const validateForm = () => {
  errors.value = {};

  if (!name.value) {
    errors.value.name = "El nombre es obligatorio.";
  } else if (name.value.length < 3) {
    errors.value.name = "El nombre debe tener al menos 3 caracteres.";
  }

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

  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Confirma tu contraseña.";
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Las contraseñas no coinciden.";
  }

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    await register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });

    successMessage.value = "Registro exitoso, ahora inicia sesión.";
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    errors.value = {};
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Error al registrarse.";
    errors.value = error.response?.data?.errors || {};
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="input-group">
      <label>Nombre</label>
      <input type="text" v-model="name" required />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

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

    <div class="input-group">
      <label>Confirmar Contraseña</label>
      <input type="password" v-model="confirmPassword" required />
      <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
    </div>

    <button type="submit" class="button">Registrarse</button>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<style scoped>
.error {
  color: red;
  font-size: 14px;
}
body {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  background-color: #1e1e1e;
}

.container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #000000;
  -webkit-text-stroke: 1px red;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
}

.input-group span {
  color: red;
  font-size: 12px;
}

.button {
  background-color: #a00;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
}

.button:hover {
  opacity: 0.9;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
