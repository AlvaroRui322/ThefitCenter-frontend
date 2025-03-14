<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'
import AddToRoutineModal from '../components/AddToRoutineModal.vue'

const route = useRoute()
const router = useRouter()

const exercise = ref(null)
const routines = ref([])
const selectedExercise = ref(null)

const defaultImage = 'https://via.placeholder.com/500x300.png?text=No+Image'

onMounted(() => {
  fetchExerciseDetail()
  fetchRoutines()
})

async function fetchExerciseDetail() {
  try {
    const response = await api.get(`/exercises/${route.params.id}`)
    exercise.value = {
      ...response.data,
      series: 3,
      repetitions: 12
    }
  } catch (error) {
    console.error('Error al cargar detalle:', error)
  }
}

async function fetchRoutines() {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get('/routines', {
      headers: { Authorization: `Bearer ${token}` }
    })
    routines.value = response.data
  } catch (error) {
    console.error('Error al cargar rutinas:', error)
  }
}

function goBack() {
  router.back()
}

function openAddToRoutineModal(ex) {
  selectedExercise.value = ex
}

async function addExerciseToRoutine(routineId, exerciseId, series, reps) {
  try {
    const token = localStorage.getItem('token')
    await api.post(`/routines/${routineId}/exercises`, {
      exercise_id: exerciseId,
      series,
      repetitions: reps
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('✅ Añadido a la rutina')
    selectedExercise.value = null
  } catch (error) {
    console.error('Error añadiendo a rutina:', error)
  }
}

async function createRoutine(routineName) {
  try {
    const token = localStorage.getItem('token')
    const response = await api.post('/routines', {
      name: routineName
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    routines.value.push(response.data)
    return response.data.id
  } catch (error) {
    console.error('Error creando rutina:', error)
  }
}
</script>

<template>
  <div class="exercise-detail-page">
    <button @click="goBack">⬅️ Volver</button>

    <div v-if="exercise">
      <h1>{{ exercise.name }}</h1>

      <img
          :src="exercise.image || defaultImage"
          :alt="exercise.name"
          class="exercise-image"
      />

      <p>{{ exercise.description }}</p>

      <div>
        <p><strong>Músculo principal:</strong> {{ exercise.main_muscle }}</p>
        <p><strong>Equipo necesario:</strong> {{ exercise.equipment }}</p>
        <p><strong>Dificultad:</strong> {{ exercise.difficulty }}</p>
      </div>

      <button @click="openAddToRoutineModal(exercise)">➕ Añadir a rutina</button>
    </div>

    <AddToRoutineModal
        v-if="selectedExercise"
        :routines="routines"
        :exerciseId="selectedExercise.id"
        :onAdd="addExerciseToRoutine"
        :onCreateRoutine="createRoutine"
        @close="selectedExercise = null"
    />
  </div>
</template>


<style scoped>
.exercise-detail-page {
  background-color: #1d1d1d;
  color: #fff;
  padding: 2rem;
}

.back-button {
  background-color: #444;
  padding: 10px 15px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.exercise-detail h1 {
  font-size: 2.5rem;
  margin: 20px 0;
}

.exercise-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.description {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.extra-info p {
  margin: 5px 0;
}

.add-to-routine {
  margin-top: 20px;
  background-color: #d72638;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: #222;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}
</style>
