<template>
  <v-app>
    <v-navigation-drawer
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      permanent
      location="right"
      :width="500"
    >
      <v-card variant="flat">
        <v-card-title>
          <div :style="{ display: 'flex' }">
            <div>{{ node.data.icon }}</div>
            <span>
              {{ node.label }}
            </span>
          </div>
        </v-card-title>

        <v-card-text v-if="node">
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="node.label"
            label="Title"
          />
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="nodeData.description"
            label="Description"
          />

          <div v-if="node.type === 'addComment'">
            <v-text-field
              variant="outlined"
              density="compact"
              clearable
              clear-icon="mdi-close"
              v-model="nodeData.comment"
              label="Comment"
            />
          </div>

          <div
            v-if="node.type === 'sendMessage'"
            :style="{ marginTop: '12px' }"
          ></div>

          <div
            v-if="node.type === 'businessHours'"
            :style="{ marginTop: '12px' }"
          >
            <div v-for="(item, index) in nodeData.times" :key="index">
              <v-row no-gutters height="42px">
                <v-col cols="2">
                  <strong :style="{ margin: 'auto' }">{{ item.day }}:</strong>
                </v-col>

                <v-col cols="4" :style="{ margin: 'auto' }">
                  <v-text-field
                    type="time"
                    variant="outlined"
                    density="compact"
                    v-model="item.startTime"
                    :items="hourOptions"
                    label="Start Time"
                /></v-col>

                <v-col cols="4" :style="{ margin: 'auto' }">
                  <v-text-field
                    type="time"
                    variant="outlined"
                    density="compact"
                    v-model="item.endTime"
                    :items="hourOptions"
                    label="End Time"
                /></v-col>
              </v-row>
            </div>

            <!-- Timezone Selector -->
            <v-select
              variant="outlined"
              density="compact"
              v-model="nodeData.timezone"
              :items="['UTC', 'PST', 'EST', 'CST', 'MST']"
              label="Timezone"
              :style="{ marginTop: '6px' }"
            ></v-select>
          </div>
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

const route = useRoute();
const store = useFlowchartStore();
const node = ref(null);
const nodeData = ref({});

const hourOptions = Array.from(
  { length: 24 },
  (_, i) => String(i).padStart(2, "0") + ":00"
);

watch(
  () => route.params.id,
  (newId) => {
    console.log("watcher triggered", newId);
    node.value = store.getNodeData(newId);
    nodeData.value = node.value.data;
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
  height: 98vh !important;
  overflow-y: hidden;
  padding: 10px;
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
  background-color: #018786;
}

.delete-btn {
  background-color: #b00020;
}

.close-btn {
  background-color: grey;
  color: white;
}
</style>
