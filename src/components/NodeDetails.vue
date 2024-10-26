<template>
  <Transition name="slide">
    <div v-if="modelValue" class="drawer-overlay">
      <v-card class="drawer-card" variant="flat">
        <v-card-title :style="{ marginBottom: '8px' }">
          <div :style="{ display: 'flex' }">
            <div>{{ node?.data?.icon }}</div>
            <span>{{ node?.label }}</span>
          </div>
        </v-card-title>

        <v-card-text v-if="node">
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="formData.label"
            label="Title"
          />
          <v-text-field
            variant="outlined"
            density="compact"
            v-model="formData.description"
            label="Description"
          />

          <div v-if="node.type === 'addComment'">
            <v-text-field
              variant="outlined"
              density="compact"
              clearable
              clear-icon="mdi-close"
              v-model="formData.comment"
              label="Comment"
            />
          </div>

          <div v-if="node.type === 'sendMessage'">
            <v-textarea
              variant="outlined"
              density="compact"
              clearable
              clear-icon="mdi-close"
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
              :disabled="formData.attachments?.length >= 6"
              :class="{ 'custom-file-input': true }"
            />
          </div>

          <div
            v-if="node.type === 'businessHours'"
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
                    :items="hourOptions"
                    label="Start Time"
                  />
                </v-col>

                <v-col cols="4" :style="{ margin: 'auto' }">
                  <v-text-field
                    type="time"
                    variant="outlined"
                    density="compact"
                    v-model="formData.times[index].endTime"
                    :items="hourOptions"
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
    </div>
  </Transition>
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
const fileInput = ref(null);

// Create a separate form data object to store temporary changes
const formData = ref({
  label: "",
  description: "",
  comment: "",
  text: "",
  timezone: "UTC",
  times: [],
  attachments: [],
});

const hourOptions = Array.from(
  { length: 24 },
  (_, i) => String(i).padStart(2, "0") + ":00"
);

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

watch(
  () => route.params.id,
  (newId) => {
    node.value = store.getNodeById(newId);

    // Initialize formData with node data
    formData.value = {
      label: node.value?.label || "",
      description: node.value?.data?.description || "",
      comment: node.value?.data?.comment || "",
      text: node.value?.data?.text || "",
      timezone: node.value?.data?.timezone || "UTC",
      times: [...(node.value?.data?.times || [])],
      attachments: [...(node.value?.data?.attachments || [])],
    };
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
  // Only update the store when the update button is clicked
  store.updateNode(
    route.params.id,
    formData.value.label,
    formData.value.description
  );

  if (node.type === "addComment") {
    store.updateNode(route.params.id, {
      data: {
        ...node.value.data,
        comment: formData.value.comment,
      },
    });
  }

  if (node.type === "sendMessage") {
    store.updateNode(route.params.id, {
      data: {
        ...node.value.data,
        text: formData.value.text,
        attachments: formData.value.attachments,
      },
    });
  }

  if (node.type === "businessHours") {
    store.updateNode(route.params.id, {
      data: {
        ...node.value.data,
        times: formData.value.times,
        timezone: formData.value.timezone,
      },
    });
  }

  emitClose();
};
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
