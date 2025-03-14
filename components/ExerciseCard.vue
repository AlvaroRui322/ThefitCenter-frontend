<template>
  <div class="exercise-item">
    <router-link :to="`/exercises/${exercise.id}`" class="exercise-link">
      <img :src="exercise.image" :alt="exercise.name" class="exercise-image" />

      <div class="exercise-info">
        <h3>{{ exercise.name }}</h3>
        <div class="exercise-meta">
          <span>💪 {{ exercise.main_muscle }}</span>
          <span>⚙️ {{ exercise.equipment }}</span>
          <span>🔥 {{ exercise.difficulty }}</span>
        </div>
      </div>
    </router-link>

    <div class="series-reps">
      <div class="series-reps-item">
        <label for="series">Series</label>
        <input
            id="series"
            type="number"
            v-model.number="exercise.series"
            min="1"
            class="input-number"
        />
      </div>
      <div class="series-reps-item">
        <label for="repetitions">Reps</label>
        <input
            id="repetitions"
            type="number"
            v-model.number="exercise.repetitions"
            min="1"
            class="input-number"
        />
      </div>
    </div>

    <!-- ✅ Al hacer clic, se emite el evento 'add-to-routine' con el ejercicio completo -->
    <button @click="handleAddToRoutine" class="add-button">
      ➕ Añadir a Rutina
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  exercise: Object
})

const emit = defineEmits(['add-to-routine'])

const handleAddToRoutine = () => {
  emit('add-to-routine', props.exercise)
}
</script>

<style scoped>
/* ✅ Tu CSS tal cual está */
.exercise-item {
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: #f1f1f1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 320px;
}

.exercise-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

.exercise-link {
  text-decoration: none;
  color: inherit;
}

.exercise-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.exercise-info {
  padding: 1rem;
  background-color: #252525;
}

.exercise-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.exercise-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #aaa;
}

.series-reps {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #1e1e1e;
}

.series-reps-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.series-reps-item label {
  font-size: 0.75rem;
  margin-bottom: 0.3rem;
  color: #aaa;
}

.input-number {
  width: 60px;
  padding: 0.4rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #2c2c2c;
  color: #f1f1f1;
  text-align: center;
}

.add-button {
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0 0 12px 12px;
}

.add-button:hover {
  background-color: #b71c1c;
}
</style>

