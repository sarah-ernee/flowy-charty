<template>
  <div 
    class="flow-node"
    :class="node.type"
  >
    <div class="node-header">
      {{ node.name || node.type }}
    </div>

    <div class="node-content">
      <div v-if="node.type === 'sendMessage'" class="message-content">
        <div v-for="(item, index) in node.data?.payload" :key="index">
          <div v-if="item.type === 'text'">{{ item.text }}</div>
          <img 
            v-else-if="item.type === 'attachment'" 
            :src="item.attachment" 
            alt="attachment"
            class="attachment-preview"
          >
        </div>
      </div>
      
      <div v-else-if="node.type === 'businessHours'" class="business-hours">
        <div v-for="(time, index) in node.data?.times" :key="index">
          {{ time.day }}: {{ time.startTime }} - {{ time.endTime }}
        </div>
      </div>

      <div v-else-if="node.type === 'addComment'" class="comment">
        {{ node.data?.comment }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.flow-node {
  position: absolute;
  min-width: 200px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.node-header {
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.node-content {
  padding-top: 8px;
}

.attachment-preview {
  max-width: 100%;
  height: auto;
  margin-top: 8px;
}

.business-hours {
  font-size: 0.9em;
}

.comment {
  font-style: italic;
  color: #666;
}
</style>