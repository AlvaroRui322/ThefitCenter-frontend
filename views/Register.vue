<template>
  <div class="container">
    <h1>📝 Registro</h1>
    <form @submit.prevent="register">
      <div class="input-group">
        <label>Nombre de usuario</label>
        <input type="text" v-model="username" />
        <span v-if="errors.username">{{ errors.username }}</span>
      </div>

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

      <div class="input-group">
        <label>Confirmar Contraseña</label>
        <input type="password" v-model="confirmPassword" />
        <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
      </div>

      <button type="submit" class="button">Registrarse</button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.username) this.errors.username = "El usuario es obligatorio.";
      if (!this.email) this.errors.email = "El email es obligatorio.";
      else if (!/\S+@\S+\.\S+/.test(this.email))
        this.errors.email = "El email no es válido.";
      if (!this.password) this.errors.password = "La contraseña es obligatoria.";
      else if (this.password.length < 6)
        this.errors.password = "Debe tener al menos 6 caracteres.";
      if (this.password !== this.confirmPassword)
        this.errors.confirmPassword = "Las contraseñas no coinciden.";
      return Object.keys(this.errors).length === 0;
    },
    register() {
      if (this.validateForm()) {
        this.successMessage = "Registro exitoso (aún sin backend).";
        this.username = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
      }
    },
  },
};
</script>
