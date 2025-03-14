<script>
export default {
  name: "Home",
  methods: {
    goToRegister() {
      this.$router.push("/register");
    }
  }
}
</script>

<template>
  <div class="hero">
    <h1>Private Coaching for Busy People</h1>
    <p>Entrenamiento personalizado para que alcances tus objetivos.</p>
    <button class="button" @click="goToRegister">Sign Up Today</button>
  </div>
</template>

<style scoped>

</style>