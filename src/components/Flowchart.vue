<template>
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :node-types="{ custom: CustomNode }"
    :pan="true"
    :zoom="true"
    :default-viewport="{ zoom: 1.5 }"
    :fit-view-on-init="true"
    :style="{ width: '100%', height: '80vh' }"
  />
</template>

<script setup>
import { VueFlow } from "@vue-flow/core";
import CustomNode from "./CustomNode.vue";

import { useFlowchartStore } from "../stores/flowchartStore";
import { storeToRefs } from "pinia";

const store = useFlowchartStore();
const { nodes, edges } = storeToRefs(store);
</script>

<style scoped></style>
