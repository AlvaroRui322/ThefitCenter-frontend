<template>
  <div class="container">
    <h1>🔑 Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="email" />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="input-group">
        <label>Contraseña</label>
        <input type="password" v-model="password" />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>

      <button type="submit" class="button">Ingresar</button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.email) this.errors.email = "El email es obligatorio.";
      if (!this.password) this.errors.password = "La contraseña es obligatoria.";
      return Object.keys(this.errors).length === 0;
    },
    login() {
      if (this.validateForm()) {
        this.successMessage = "Login exitoso (aún sin backend).";
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>
