<template>
  <div class="background">
    <v-btn class="add-node-btn" @click="showDialog = true" variant="outlined">
      Create New Node
    </v-btn>

    <div class="flowchart-container">
      <Flowchart />
    </div>

    <v-dialog v-model="showDialog" :style="{ maxWidth: '500px' }">
      <v-card :style="{ padding: '20px' }">
        <v-card-title>Create New Node</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="newNode.title"
              label="Title"
              aria-required="true"
              :rules="textfieldRules"
              required
            ></v-text-field>

            <v-text-field
              v-model="newNode.description"
              label="Description"
              aria-required="true"
              :rules="textfieldRules"
              required
            ></v-text-field>

            <v-select
              v-model="newNode.type"
              :items="nodeTypes"
              label="Type"
              :rules="[(v) => !!v || 'Node type is required']"
              required
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            text
            @click="
              $emit('close');
              resetForm();
            "
          >
            Cancel
          </v-btn>

          <v-btn :disabled="!formValid" @click="submitNode()">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="js">
import { ref } from "vue";
import Flowchart from "./Flowchart.vue";

// Form properties
const newNode = ref({
  title: "",
  description: "",
  type: "",
});

const nodeTypes = ["sendMessage", "addComment", "businessHours"];
const showDialog = ref(false);
const formValid = ref(false);
const textfieldRules = [
  (v) => !!v || "Field is required",
  (v) =>
    (typeof v === "string" && isNaN(Number(v))) || "Field must be a string",
];

// Form functions
const resetForm = () => {
  newNode.value.title = "";
  newNode.value.description = "";
  newNode.value.type = "";
};

const submitNode = () => {
  if (!formValid.value) return;

  $emit("create", newNode.value);
  resetForm();
};
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
  right: 20px;
  text-transform: capitalize;
  background-color: #01579b;
  color: white;
}

.flowchart-container {
  padding-top: 60px;
  height: 500px;
  margin: auto;
}

.v-text-field {
  margin-bottom: 4px;
}
</style>
