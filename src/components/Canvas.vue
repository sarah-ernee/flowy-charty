<template>
  <div class="background">
    <v-btn
      class="add-node-btn"
      @click="showDialog = true"
      variant="outlined"
      size="large"
    >
      Create New Node
    </v-btn>

    <div class="flowchart-container">
      <Flowchart />
    </div>

    <v-dialog v-model="showDialog" :style="{ maxWidth: '500px' }">
      <v-card :style="{ padding: '10px' }">
        <v-card-title>Create New Node</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="newNode.title"
              variant="outlined"
              label="Title"
              aria-required="true"
              :rules="textfieldRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="newNode.description"
              variant="outlined"
              label="Description"
              aria-required="true"
              :rules="textfieldRules"
              required
            ></v-text-field>

            <v-select
              v-model="newNode.type"
              variant="outlined"
              :items="['sendMessage', 'addComment', 'businessHours']"
              label="Node Type"
              :rules="[(v) => !!v || 'Node type is required']"
              required
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn :disabled="!formValid" @click="submitNode" class="create-btn">
            Create Node
          </v-btn>
          <v-btn @click="closeDialog" class="cancel-btn">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useFlowchartStore } from "../stores/flowchartStore";
import Flowchart from "./Flowchart.vue";

const router = useRouter();
const store = useFlowchartStore();

// Form properties
const showDialog = ref(false);
const formValid = ref(false);

const textfieldRules = [
  (v) => !!v || "Field is required",
  (v) =>
    (typeof v === "string" && isNaN(Number(v))) || "Field must be a string",
];

// Form functions
const newNode = ref({
  title: "",
  description: "",
  type: "",
});

const resetForm = () => {
  newNode.value.title = "";
  newNode.value.description = "";
  newNode.value.type = "";
};

const closeDialog = () => {
  showDialog.value = false;
  resetForm();
};

const submitNode = () => {
  if (!formValid.value) return;

  store.addNode(newNode.value);
  closeDialog();
};

// Clear up route on refresh
onMounted(() => {
  router.push("/");
});

onBeforeUnmount(() => {
  closeDialog();
});
</script>

<style scoped>
.background {
  background-color: #181a1b;
  background: linear-gradient(90deg, #181a1b 20px, transparent 1%) center,
    linear-gradient(#181a1b 20px, transparent 1%) center, white;
  background-size: 21px 21px;
  min-height: 100vh;
  width: 100%;
}

.add-node-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  text-transform: capitalize;
  background-color: #bb86fc;
  color: #181a1b;
  font-weight: 650;
}

.flowchart-container {
  padding-top: 60px;
  height: 750px;
  margin: auto;
}

.v-text-field {
  margin-bottom: 10px;
}

.create-btn,
.cancel-btn {
  text-transform: capitalize;
}

.create-btn {
  background-color: #018786;
}

.cancel-btn {
  background-color: grey;
  color: white;
}
</style>
