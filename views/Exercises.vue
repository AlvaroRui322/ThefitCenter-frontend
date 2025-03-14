<script setup>
import {ref, onMounted, watchEffect, watch} from 'vue'
import api from '../api'
import ExerciseCard from '../components/ExerciseCard.vue'
import AddToRoutineModal from '../components/AddToRoutineModal.vue'

// Estados del componente
const search = ref('')
const selectedDifficulty = ref('')
const selectedMuscle = ref('')
const selectedEquipment = ref('')

const exercises = ref([])
const routines = ref([])
const selectedExercise = ref(null)

// Obtener ejercicios
const fetchExercises = async () => {
  try {
    const params = new URLSearchParams({
      name: search.value,
      difficulty: selectedDifficulty.value,
      main_muscle: selectedMuscle.value,
      equipment: selectedEquipment.value
    }).toString()

    const response = await api.get(`/exercises?${params}`)

    // Asegurar estructura de respuesta
    exercises.value = response.data.data?.data?.map(ex => ({
      ...ex,
      series: 3,
      repetitions: 12
    })) || []
  } catch (error) {
    console.error('Error fetching exercises:', error)
    exercises.value = []
  }
}

// Añadir watchers para los filtros
watch([search, selectedDifficulty, selectedMuscle, selectedEquipment], () => {
  fetchExercises()
})

// Obtener rutinas del usuario
const fetchRoutines = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get('/routines', {
      headers: { Authorization: `Bearer ${token}` }
    })
    routines.value = response.data
  } catch (error) {
    console.error('Error fetching routines:', error)
  }
}

// Añadir ejercicio a rutina
const addToRoutine = async (routineId, exerciseId, series, reps) => {
  try {
    const token = localStorage.getItem('token')
    await api.post(`/routines/${routineId}/exercises`, {
      exercise_id: exerciseId,
      series,
      repetitions: reps
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' // Añadir esto
      }
    })
    alert('✅ Ejercicio añadido correctamente')
    selectedExercise.value = null
  } catch (error) {
    console.error('Error adding exercise:', error)
    alert(`❌ Error: ${error.response?.data?.error || 'Error al añadir ejercicio'}`)
  }
}

const createRoutine = async (routineName) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No hay token de autenticación');

    const response = await api.post('/routines', {
      name: routineName
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Actualizar lista y retornar ID
    await fetchRoutines();
    return response.data.id;

  } catch (error) {
    alert(`🔥 Error crítico: ${error.response?.data?.message || 'Fallo en el servidor'}`);
    throw error;
  }
};

// Abrir el modal para añadir a rutina
const openAddToRoutineModal = (exercise) => {
  selectedExercise.value = exercise
}

onMounted(() => {
  fetchExercises()
  fetchRoutines()
})
</script>

<template>
  <div class="exercises-page">
    <h1 class="title">🏋️ Buscar Ejercicios</h1>

    <!-- Filtros -->
    <div class="filters">
      <input v-model="search" placeholder="Nombre..." class="filter-input" />
      <select v-model="selectedDifficulty" class="filter-select">
        <option value="">Todas las dificultades</option>
        <option>Fácil</option>
        <option>Media</option>
        <option>Difícil</option>
      </select>
      <select v-model="selectedMuscle" class="filter-select">
        <option value="">Todos los músculos</option>
        <option>Pecho</option>
        <option>Piernas</option>
        <option>Espalda</option>
      </select>
      <select v-model="selectedEquipment" class="filter-select">
        <option value="">Todo el equipo</option>
        <option>Ninguno</option>
        <option>Mancuernas</option>
        <option>Barra</option>
      </select>
    </div>

    <!-- Lista de ejercicios -->
    <div class="exercise-list">
      <ExerciseCard
          v-for="exercise in exercises"
          :key="exercise.id"
          :exercise="exercise"
          @add-to-routine="openAddToRoutineModal"
      />
    </div>

    <!-- Modal de añadir a rutina -->
    <AddToRoutineModal
        v-if="selectedExercise"
        :routines="routines"
        :exerciseId="selectedExercise.id"
        :onAdd="addToRoutine"
        :onCreateRoutine="createRoutine"
        @close="selectedExercise = null"
    />
  </div>
</template>


<style scoped>
.exercises-page {
  padding: 2rem;
  background-color: #121212;
  min-height: 100vh;
  color: #fff;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-input,
.filter-select {
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #2c2c2c;
  color: #f1f1f1;
  font-size: 1rem;
  min-width: 200px;
}

.filter-input::placeholder {
  color: #aaa;
}

.exercise-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  color: #fff;
}

</style>

