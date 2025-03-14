<template>
  <div class="create-routine-page">
    <h1>Crear Nueva Rutina</h1>

    <form @submit.prevent="createRoutine">
      <input
          v-model="routine.name"
          type="text"
          placeholder="Nombre de la rutina"
          required
      />

      <textarea
          v-model="routine.description"
          placeholder="Descripción de la rutina (opcional)"
      ></textarea>

      <button type="submit">➕ Crear Rutina</button>
    </form>

    <button @click="goBack">⬅️ Volver</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()

const routine = ref({
  name: '',
  description: '',
})

async function createRoutine() {
  try {
    await api.post('/routines', routine.value)
    alert('✅ Rutina creada con éxito!')
    router.push('/exercises') // o donde prefieras llevarlo después
  } catch (error) {
    console.error('Error creando rutina:', error)
  }
}

function goBack() {
  router.back()
}
</script>

<style scoped>
.create-routine-page {
  background-color: #1d1d1d;
  color: white;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  padding: 10px;
  margin-bottom: 15px;
  background-color: #333;
  color: white;
  border: 1px solid #555;
}

button {
  background-color: #d72638;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ff4f5a;
}
</style>
