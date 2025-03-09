<template>
  <div class="container">
    <h1>📧 Contacto</h1>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label>Nombre</label>
        <input type="text" v-model="name" />
        <span v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="email" />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="input-group">
        <label>Mensaje</label>
        <textarea v-model="message"></textarea>
        <span v-if="errors.message">{{ errors.message }}</span>
      </div>

      <button type="submit" class="button">Enviar</button>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.name) this.errors.name = "El nombre es obligatorio.";
      if (!this.email) this.errors.email = "El email es obligatorio.";
      else if (!/\S+@\S+\.\S+/.test(this.email))
        this.errors.email = "El email no es válido.";
      if (!this.message) this.errors.message = "El mensaje no puede estar vacío.";
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.successMessage = "Mensaje enviado correctamente (aún sin backend).";
        this.name = "";
        this.email = "";
        this.message = "";
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: left;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  font-weight: bold;
}
.input-group input,
.input-group textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: none;
  background-color: #222;
  color: white;
}
.input-group span {
  color: red;
  font-size: 12px;
}
.button {
  background-color: #d72638;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  display: block;
  width: 100%;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>
