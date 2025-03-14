<template>
  <div class="container">
    <h1>Contacto</h1>
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
        <textarea v-model="message" rows="6"></textarea>
        <span v-if="errors.message">{{ errors.message }}</span>
      </div>

      <button type="submit" class="button">Enviar Mensaje</button>
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
      else if (!/\S+@\S+\.\S+/.test(this.email)) this.errors.email = "Email no válido.";
      if (!this.message) this.errors.message = "El mensaje es obligatorio.";
      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        this.successMessage = "Mensaje enviado (aún sin backend).";
        this.name = "";
        this.email = "";
        this.message = "";
      }
    },
  },
};
</script>

<style scoped>
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

.input-group textarea {
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 150px;
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


