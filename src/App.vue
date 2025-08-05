<!-- src/App.vue -->
<template>
  <BHeader />

  <main class="container my-4">
    
    <router-view />
  </main>
</template>

<script setup>
import BHeader from './components/BHeader.vue'
</script>

<style>

</style>