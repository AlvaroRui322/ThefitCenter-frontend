<template>
  <div class="container">
    <h1>👤 Mi Perfil</h1>
    <div v-if="user">
      <p><strong>Nombre:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>

    <h2>💪 Mis Rutinas</h2>
    <div class="routine-creator">
      <input
          v-model="newRoutine"
          placeholder="Nombre de la nueva rutina"
          class="routine-input"
      />
      <button
          @click="addRoutine"
          class="create-btn"
      >
        ➕ Crear Rutina
      </button>
    </div>

    <ul class="routine-list">
      <li
          v-for="routine in routines"
          :key="routine.id"
          class="routine-item"
      >
        <span class="routine-name">{{ routine.name }}</span>
        <div class="routine-actions">
          <button
              @click="viewRoutine(routine)"
              class="btn-view"
          >👀 Ver</button>
          <button
              @click="deleteRoutine(routine.id)"
              class="btn-delete"
          >🗑️ Eliminar</button>
        </div>
      </li>
    </ul>

    <div v-if="selectedRoutine">
      <h2>🏋️ Ejercicios en "{{ selectedRoutine.name }}"</h2>

      <div class="exercise-list">
        <div
            v-for="exercise in selectedRoutine.exercises"
            :key="exercise.id"
            class="exercise-card"
        >
          <div class="card-header">
            <h3>{{ exercise.name }}</h3>
            <button
                @click="deleteExerciseFromRoutine(selectedRoutine.id, exercise.id)"
                class="delete-btn"
            >
              🗑️ Eliminar
            </button>
          </div>

          <div class="exercise-details">
            <div class="detail-item">
              <span class="label">Series</span>
              <span class="value">{{ exercise.series }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Reps</span>
              <span class="value">{{ exercise.repetitions }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Músculo</span>
              <span class="value">{{ exercise.main_muscle }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Equipo</span>
              <span class="value">{{ exercise.equipment }}</span>
            </div>
          </div>
        </div>
      </div>

      <p
          v-if="selectedRoutine.exercises.length === 0"
          class="no-exercises"
      >
        No hay ejercicios en esta rutina 😢
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

// Estados reactivos
const user = ref(null)
const newRoutine = ref('')
const routines = ref([])
const selectedRoutine = ref(null)

// Obtener datos del usuario
const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get('/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = response.data
  } catch (error) {
    console.error('Error al obtener el perfil:', error)
  }
}

// Obtener rutinas
const fetchRoutines = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get('/routines', {
      headers: { Authorization: `Bearer ${token}` }
    })
    routines.value = response.data
  } catch (error) {
    console.error('Error al obtener rutinas:', error)
  }
}

// Añadir rutina
const addRoutine = async () => {
  if (!newRoutine.value) return
  try {
    const token = localStorage.getItem('token')
    const response = await api.post('/routines', {
      name: newRoutine.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    // Verifica la estructura de la respuesta
    console.log('Respuesta de la API:', response.data)

    // Si la respuesta tiene una propiedad data (común en APIs REST)
    if (response.data.data) {
      routines.value.push(response.data.data)
    } else {
      routines.value.push(response.data)
    }

    newRoutine.value = ''
    alert('✅ Rutina creada correctamente')
  } catch (error) {
    console.error('Error detallado:', error.response)
    alert(`❌ Error: ${error.response?.data?.message || 'Error al crear rutina'}`)
  }
}

// Eliminar rutina
const deleteRoutine = async (routineId) => {
  if (!confirm('¿Seguro que quieres eliminar esta rutina?')) return
  try {
    const token = localStorage.getItem('token')
    await api.delete(`/routines/${routineId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    routines.value = routines.value.filter(r => r.id !== routineId)
    if (selectedRoutine.value?.id === routineId) {
      selectedRoutine.value = null
    }
    alert('✅ Rutina eliminada correctamente')
  } catch (error) {
    alert(`❌ Error: ${error.response?.data?.error || 'Error al eliminar'}`)
  }
}

// Ver rutina
const viewRoutine = async (routine) => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get(`/routines/${routine.id}/exercises`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    selectedRoutine.value = {
      ...routine,
      exercises: response.data.map(ex => ({
        ...ex,
        series: ex.pivot.series,
        repetitions: ex.pivot.repetitions
      }))
    }
  } catch (error) {
    console.error('Error al cargar ejercicios:', error)
  }
}

// Eliminar ejercicio de rutina
const deleteExerciseFromRoutine = async (routineId, exerciseId) => {
  if (!confirm('¿Eliminar ejercicio de la rutina?')) return
  try {
    const token = localStorage.getItem('token')
    await api.delete(`/routines/${routineId}/exercises/${exerciseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    selectedRoutine.value.exercises = selectedRoutine.value.exercises.filter(
        ex => ex.id !== exerciseId
    )
    alert('✅ Ejercicio eliminado')
  } catch (error) {
    alert(`❌ Error: ${error.response?.data?.error || 'Error al eliminar'}`)
  }
}

// Inicialización
onMounted(() => {
  fetchUserData()
  fetchRoutines()
})
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #f5f5f5;
  font-family: 'Inter', sans-serif;
  background: #0a0a0a;
  min-height: 100vh;
}

h1, h2 {
  border-bottom: 2px solid #2d2d2d;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  background: linear-gradient(45deg, #ff4444, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(255, 68, 68, 0.2);
}

h2 {
  font-size: 1.8rem;
  color: #ff4444;
  margin-top: 2.5rem;
  border-bottom: 1px solid #ff4444;
}

input {
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: 2px solid #4a4a4a;
  background: #1a1a1a;
  color: #fff;
  margin-right: 1rem;
  width: 300px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #ff4444;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.2);
}

button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  background: #ff4444;
  color: #fff;
}

button:hover {
  transform: translateY(-2px);
  background: #ff5555;
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
}

.routine-item {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #4a4a4a;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.routine-item:hover {
  border-color: #ff4444;
  box-shadow: 0 4px 20px rgba(255, 68, 68, 0.25);
  transform: translateY(-3px);
}

.routine-actions {
  display: flex;
  gap: 0.8rem;
}

.btn-view {
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border: 1px solid #ff4444;
}

.btn-delete {
  background: rgba(255, 68, 68, 0.1);
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
}

.btn-delete:hover {
  background: #ff4444;
  color: #fff;
}

.exercises-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.exercise-card {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  border: 2px solid #4a4a4a;
  transition: all 0.3s ease;
}

.exercise-card:hover {
  transform: translateY(-5px);
  border-color: #ff4444;
  box-shadow: 0 8px 25px rgba(255, 68, 68, 0.2);
}

.no-exercises {
  color: #ff4444;
  background: rgba(255, 68, 68, 0.05);
  border: 2px dashed #ff4444;
}

/* Efecto "glow" para elementos activos */
input:focus,
button:focus,
.routine-item:focus-within {
  box-shadow: 0 0 15px rgba(255, 68, 68, 0.3);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.2rem;
    text-align: center;
  }

  input {
    width: 100%;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
  }
}

.exercise-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.exercise-card {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #ff4444;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.red-theme {
  border: 2px solid #ff4444;
  box-shadow: 0 4px 20px rgba(255, 68, 68, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.4rem;
  color: #ff4444;
}

.delete-btn {
  background: rgba(255, 68, 68, 0.15);
  color: #ff4444;
  border: 2px solid #ff4444;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: #ff4444;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
}

.exercise-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-item {
  background: #0a0a0a;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #2d2d2d;
}

.label {
  display: block;
  color: #ff4444;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
}

.value {
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
