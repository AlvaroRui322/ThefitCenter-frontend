<template>
  <div class="container">
    <h1>Iniciar Sesión</h1>
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
  </div>
</template>

<script>
import { useUserStore } from '../stores/user';
import { login } from '../services/authService';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      errorMessage: '',
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.email) {
        this.errors.email = 'El email es obligatorio.';
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = 'El email no es válido.';
      }

      if (!this.password) {
        this.errors.password = 'La contraseña es obligatoria.';
      } else if (this.password.length < 6) {
        this.errors.password = 'Mínimo 6 caracteres.';
      }

      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) return;

      try {
        const response = await login({
          email: this.email,
          password: this.password,
        });

        const userStore = useUserStore();
        userStore.setToken(response.data.token);

        this.$router.push('/profile');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Error en las credenciales.';
      }
    },
  },
};
</script>


<style scoped>
/* Mismo CSS para los tres formularios */

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
