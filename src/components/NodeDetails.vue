<template>
  <Transition name="slide">
    <div class="drawer-overlay">
      <v-card class="drawer-card" variant="flat">
        <v-card-title :style="{ marginBottom: '8px' }">
          <div :style="{ display: 'flex' }">
            <div>{{ nodeData?.icon }}</div>
            <span>{{ node?.label }}</span>
          </div>
        </v-card-title>

        <v-card-text v-if="node">
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="formData.label"
            label="Title"
            :error="!formData.label"
            :error-messages="!formData.label ? 'Title cannot be empty' : ''"
            required
            :style="{ marginBottom: '4px' }"
          />
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="formData.description"
            label="Description"
            :error="!formData.description"
            :error-messages="
              !formData.description ? 'Description cannot be empty' : ''
            "
            required
          />

          <div v-if="nodeType === 'addComment'">
            <v-text-field
              variant="outlined"
              density="compact"
              clearable
              clear-icon="mdi-close-circle"
              v-model="formData.comment"
              label="Comment"
            />
          </div>

          <div v-if="nodeType === 'sendMessage'">
            <v-textarea
              variant="outlined"
              density="compact"
              clearable
              clear-icon="mdi-close-circle"
              v-model="formData.text"
              label="Message"
            />

            <div v-if="formData.attachments && formData.attachments.length > 0">
              <strong>Attachments:</strong>
              <v-container>
                <v-row>
                  <v-col
                    v-for="(attachment, index) in formData.attachments"
                    :key="index"
                    cols="4"
                    class="d-flex ma-0 pa-1"
                  >
                    <v-img :src="attachment" alt="" aspect-ratio="1" />
                    <v-btn
                      icon="mdi-close"
                      size="small"
                      color="error"
                      class="position-absolute top-0 right-0"
                      @click="removeAttachment(index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>

            <v-file-input
              v-model="fileInput"
              variant="outlined"
              label="Click to Upload Attachment"
              @update:model-value="handleFileUpload"
              accept=".jpg, .jpeg, .png"
              chips
              clearable
              prepend-icon=""
              :disabled="formData.attachments.length >= 6"
              :class="{ 'custom-file-input': true }"
            />
          </div>

          <div
            v-if="nodeType === 'businessHours'"
            :style="{ marginTop: '12px' }"
          >
            <div v-for="(item, index) in formData.times" :key="index">
              <v-row no-gutters height="42px">
                <v-col cols="2">
                  <strong :style="{ margin: 'auto' }">{{ item.day }}:</strong>
                </v-col>

                <v-col cols="4" :style="{ margin: 'auto' }">
                  <v-text-field
                    type="time"
                    variant="outlined"
                    density="compact"
                    v-model="formData.times[index].startTime"
                    label="Start Time"
                  />
                </v-col>

                <v-col cols="4" :style="{ margin: 'auto' }">
                  <v-text-field
                    type="time"
                    variant="outlined"
                    density="compact"
                    v-model="formData.times[index].endTime"
                    label="End Time"
                  />
                </v-col>
              </v-row>
            </div>

            <v-select
              variant="outlined"
              density="compact"
              v-model="formData.timezone"
              :items="['UTC', 'PST', 'EST', 'CST', 'MST']"
              label="Timezone"
              :style="{ marginTop: '6px' }"
            />
          </div>
        </v-card-text>

        <v-card-text v-else>
          <p>The requested node does not exist.</p>
        </v-card-text>

        <v-card-actions>
          <v-btn
            size="small"
            class="update-btn"
            @click="handleUpdateNode"
            :disabled="!isFormValid"
          >
            Update Node
          </v-btn>

          <v-btn size="small" class="delete-btn" @click="handleDeleteNode">
            Delete Node
          </v-btn>

          <v-btn size="small" class="close-btn" @click="emit('close')">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, defineEmits, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFlowchartStore } from "../stores/flowchartStore";

const emit = defineEmits(["close"]);
const route = useRoute();
const store = useFlowchartStore();

const node = ref(null);
const nodeData = ref(null);
const nodeType = ref("");

// Update form properties
const isFormValid = computed(() => {
  return formData.value.label?.trim() && formData.value.description?.trim();
});

const formData = ref({
  label: "",
  description: "",
  comment: "",
  text: "",
  timezone: "UTC",
  times: [],
  attachments: [],
});

// Functions for attachment
const fileInput = ref(null);

const handleFileUpload = async (files) => {
  if (!files) return;

  const fileArray = Array.isArray(files) ? files : [files];

  for (const file of fileArray) {
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type:", file.type);
      continue;
    }
    if (file.size > 2 * 1024 * 1024) {
      console.error("File too large:", file.name);
      continue;
    }
    if (formData.value.attachments?.length >= 6) {
      console.error("Maximum attachments reached");
      break;
    }

    // Here you would handle the file upload and update formData.attachments
    // instead of directly updating the store
  }

  fileInput.value = null;
};

const removeAttachment = (index) => {
  formData.value.attachments = formData.value.attachments.filter(
    (_, i) => i !== index
  );
};

// Functions for node actions
const handleDeleteNode = () => {
  store.deleteNode(route.params.id);
  emit("close");
};

const handleUpdateNode = () => {
  const updateData = {
    label: formData.value.label,
    description: formData.value.description,
  };

  // Add type-specific data
  if (nodeType.value === "addComment") {
    updateData.comment = formData.value.comment;
  } else if (nodeType.value === "sendMessage") {
    updateData.text = formData.value.text;
  } else if (nodeType.value === "businessHours") {
    updateData.times = formData.value.times;
    updateData.timezone = formData.value.timezone;
  }

  store.updateNode(route.params.id, updateData);

  emit("close");
};

const initialize = (nodeId) => {
  const currentNode = store.getNodeById(nodeId);

  // Check explicitly to ensure value is available at the timing of access
  if (currentNode) {
    node.value = currentNode;
    nodeData.value = currentNode.data;
    nodeType.value = currentNode.type;

    // Put current values to reflect them in the drawer
    // Add defaults as failsafe in case nodeData inaccessible
    formData.value = {
      label: currentNode.label,
      description: nodeData.value?.description || "",
      comment: nodeData.value?.comment || "",
      text: nodeData.value?.text || "",
      timezone: nodeData.value?.timezone || "UTC",
      times: [...(nodeData.value?.times || [])],
      attachments: [...(nodeData.value?.attachments || [])],
    };
  } else {
    console.error(`Node with id ${nodeId} not found`);
    node.value = null;
    nodeData.value = null;
    nodeType.value = "";
  }
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      initialize(newId);
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (route.params.id) {
    initialize(route.params.id);
  }
});
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  z-index: 1000;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.1);
}

.drawer-card {
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 0;
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
