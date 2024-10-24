<template>
  <v-app>
    <v-container fluid>
      <v-navigation-drawer
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        permanent
        location="right"
        :width="400"
      >
        <v-card variant="flat">
          <v-card-title>
            <div :style="{ display: 'flex' }">
              <div v-if="node?.data.icon">{{ node?.data.icon }}</div>
              <span>
                {{ node?.label || "Node Not Found" }}
              </span>
            </div>
          </v-card-title>

          <v-card-text v-if="node">
            <v-text-field v-model="node.label" label="Title" />
            <v-textarea v-model="node.data.description" label="Description" />
          </v-card-text>

          <v-card-text v-else>
            <p>The requested node does not exist.</p>
          </v-card-text>

          <v-card-actions>
            <v-btn size="small" class="update-btn" @click="handleUpdateNode">
              Update Node
            </v-btn>

            <v-btn size="small" class="delete-btn" @click="handleDeleteNode">
              Delete Node
            </v-btn>

            <v-btn
              size="small"
              variant="dark"
              class="close-btn"
              @click="emitClose"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-navigation-drawer>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";
import { useRoute } from "vue-router";
import { useFlowchartStore } from "../stores/flowchartStore";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);
console.log("fuck your mom");

const route = useRoute();
const store = useFlowchartStore();
const node = ref(null);

watch(
  () => route.params.id,
  (newId) => {
    node.value = store.getNodeData(newId);
  },
  { immediate: true }
);

const emitClose = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleDeleteNode = () => {
  store.deleteNode(route.params.id);
  emitClose();
};

const handleUpdateNode = () => {
  const updated = store.updateNode(
    route.params.id,
    node.value.label,
    node.value.data.description
  );
  if (updated) {
    console.log("Node updated successfully.");
  } else {
    console.log("No changes made or node not found.");
  }
  emitClose();
};
</script>

<style scoped>
.v-navigation-drawer {
  height: 100vh !important;
  overflow-y: hidden;
}

.v-card {
  width: 97%;
  height: 100vh;
}

.update-btn,
.delete-btn,
.close-btn {
  text-transform: capitalize;
  margin: 0 5px 0 5px;
}

.update-btn {
  background-color: #bb86fc;
}

.delete-btn {
  background-color: #b00020;
}

.close-btn {
  background-color: grey;
  color: white;
}
</style>
