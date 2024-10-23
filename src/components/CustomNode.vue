<template>
  <div class="custom-node">
    <div class="node-header">
      <div class="node-icon">{{ data.icon }}</div>
      <div class="node-label">{{ label }}</div>
    </div>

    <div class="node-description">{{ data.description }}</div>
  </div>
</template>

<script setup>
defineProps(["data", "label"]);
</script>

<style scoped>
.custom-node {
  background-color: #2b2b2b;
  color: #e8e5e5;
  border-radius: 10px;
  border: 1px solid white;

  font-size: 18px;
  padding: 15px 10px;
  width: 250px;

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}

.node-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e5e5;
  padding: 0 0 10px 10px;
  margin: 0 -10px 10px -10px;
}

.node-icon {
  font-size: 17px;
  margin-right: 1px;
}

.node-label {
  font-weight: bold;
  font-size: 17px;
  text-align: left;
}

.node-description {
  font-size: 14px;
  display: flex;
  text-align: left;
  margin: 10px 0 0 6px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
