<template>
  <div class="app">
    <Canvas />
  </div>
</template>

<script setup>
import Canvas from "./components/Canvas.vue";
</script>

<style>
.app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: hidden;
}

.v-app {
  display: none;
}
</style>
