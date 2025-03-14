<script setup>
import { ref } from 'vue';

// Define las variables reactivas (AÑADE ESTO)
const selectedOption = ref('existing'); // 'existing' o 'new'
const routineId = ref(null);
const newRoutineName = ref('');
const series = ref(3);
const reps = ref(12);

const props = defineProps({
  routines: Array,
  exerciseId: Number,
  onAdd: Function,
  onCreateRoutine: Function
});

const emit = defineEmits(['close']);

// Corrige el método handleCreateRoutineAndAdd
const handleCreateRoutineAndAdd = async () => {
  try {
    if (selectedOption.value === 'new') {
      if (!newRoutineName.value.trim()) {
        alert('⚠️ Ingresa un nombre para la rutina');
        return;
      }
      const newRoutineId = await props.onCreateRoutine(newRoutineName.value);
      routineId.value = newRoutineId;
    }

    await props.onAdd(routineId.value, props.exerciseId, series.value, reps.value);
    emit('close');
  } catch (error) {
    alert('❌ Error: ' + (error.message || 'Error al procesar'));
  }
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Añadir a Rutina</h2>

      <!-- Selector de opción (AÑADE ESTO) -->
      <div class="option-group">
        <label>
          <input
              type="radio"
              v-model="selectedOption"
              value="existing"
          /> Seleccionar rutina existente
        </label>
        <label>
          <input
              type="radio"
              v-model="selectedOption"
              value="new"
          /> Crear nueva rutina
        </label>
      </div>

      <!-- Lista de rutinas existentes -->
      <select
          v-if="selectedOption === 'existing'"
          v-model="routineId"
          class="input-select"
      >
        <option disabled value="">Selecciona una rutina</option>
        <option
            v-for="routine in routines"
            :key="routine.id"
            :value="routine.id"
        >
          {{ routine.name }}
        </option>
      </select>

      <!-- Campo para nueva rutina -->
      <input
          v-if="selectedOption === 'new'"
          v-model="newRoutineName"
          placeholder="Nombre de la nueva rutina"
          class="input-text"
      />

      <!-- Campos para series y repeticiones -->
      <div class="input-group">
        <input
            type="number"
            v-model.number="series"
            placeholder="Series"
            class="input-number"
        />
        <input
            type="number"
            v-model.number="reps"
            placeholder="Repeticiones"
            class="input-number"
        />
      </div>

      <!-- Botones -->
      <div class="button-group">
        <button @click="handleCreateRoutineAndAdd" class="btn-confirm">
          Añadir
        </button>
        <button @click="$emit('close')" class="btn-cancel">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.option-group {
  margin-bottom: 1rem;
}

.option-group label {
  display: block;
  margin: 0.5rem 0;
  color: #fff;
}

.input-select,
.input-text,
.input-number {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: #2c2c2c;
  border: none;
  border-radius: 4px;
  color: #fff;
}

.button-group {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.btn-confirm {
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>


