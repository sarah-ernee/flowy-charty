<template>
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :node-types="{ custom: CustomNode }"
    :default-viewport="{ zoom: 1.5 }"
    :fit-view-on-init="true"
    :connectable="true"
    :enable-connection-on-handle-hover="false"
    @connect="store.onConnect"
    @edge-update="store.onEdgeUpdate"
    :style="{ width: '100%', height: '90vh' }"
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

<style>
.vue-flow__handle {
  width: 7px !important;
  height: 7px !important;
  background-color: #03dac6 !important;
  border-radius: 50% !important;
  opacity: 1 !important;
  transition: all 0.2s ease;
  position: absolute !important;
}

.vue-flow__handle.source {
  bottom: -5px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
}

.vue-flow__handle.target {
  top: -5px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
}

.vue-flow__handle:hover {
  background-color: #03dac6 !important;
  transform: translateX(-50%) scale(1.2) !important;
}

.vue-flow__connection-path {
  stroke: #03dac6;
  stroke-width: 2;
}

.vue-flow__handle-connecting {
  display: none !important;
}

.vue-flow__handle-valid {
  display: none !important;
}
</style>
