<template>
  <div class="background">
    <v-btn class="add-node-btn" @click="showDialog = true" variant="outlined">
      Create New Node
    </v-btn>

    <div class="flowchart-container">
      <Node v-for="node in nodes" :key="node.id" :node="node" />
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
              @input="validateInput($event, 'title')"
            ></v-text-field>

            <v-text-field
              v-model="newNode.description"
              label="Description"
              aria-required="true"
              :rules="textfieldRules"
              required
              @input="validateInput($event, 'description')"
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
              showDialog = false;
              resetForm();
            "
          >
            Cancel
          </v-btn>
          <v-btn :disabled="!formValid" @click="createNode()">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFlowchartStore } from "../stores/flowchartStore";
import { storeToRefs } from "pinia";

const store = useFlowchartStore();
const { nodes } = storeToRefs(store);

// Node creation properties
const newNode = ref({
  title: "",
  description: "",
  type: "",
});

const showDialog = ref(false);
const formValid = ref(false);
const textfieldRules = [
  (v) => !!v || "Field is required",
  (v) => typeof v === "string" && isNaN(Number(v)) || "Field must be a string",
];
const nodeTypes = ["sendMessage", "addComment", "businessHours"];

// Function to create a new node
const createNode = () => {
  if (!formValid.value) {
    return;
  }

  nodes.value.push({
    id: String(nodes.value.length + 1),
    type: newNode.value.type,
    position: { x: 50, y: 50 }, // Default position
    data: {
      label: newNode.value.title,
      description: newNode.value.description,
      icon: "📝",
    },
  });

  resetForm();
  showDialog.value = false;
};

// Reset form function
const resetForm = () => {
  newNode.value.title = "";
  newNode.value.description = "";
  newNode.value.type = "";
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
}

.node {
  background: #f5f5f5;
  border: 1px solid #e0dddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

.v-text-field {
  margin: 0 0 12px 0;
}
</style>
