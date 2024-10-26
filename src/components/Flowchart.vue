<template>
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :node-types="nodeTypes"
    :default-viewport="{ zoom: 2 }"
    :fit-view-on-init="true"
    :connectable="true"
    :enable-connection-on-handle-hover="true"
    @connect="onConnect"
    @edge-update="onEdgeUpdate"
    @node-click="showNodeDetails"
    class="vue-flow"
  />
  <router-view />

  <NodeDetails
    v-if="isDrawerOpen"
    v-model="isDrawerOpen"
    @close="closeDrawer"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { VueFlow } from "@vue-flow/core";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import CustomNode from "./CustomNode.vue";
import NodeDetails from "./NodeDetails.vue";
import { useFlowchartStore } from "../stores/flowchartStore";

const store = useFlowchartStore();
const router = useRouter();
const { nodes, edges } = storeToRefs(store);

const isDrawerOpen = ref(false);
const nodeTypes = {
  trigger: CustomNode,
  businessHours: CustomNode,
  sendMessage: CustomNode,
  addComment: CustomNode,
};

// Event handlers
const closeDrawer = () => {
  isDrawerOpen.value = false;
  router.push("/");
};

const showNodeDetails = ({ node }) => {
  router.push(`/node/${node.id}`);
  isDrawerOpen.value = true;
};

const onConnect = ({ source, target }) => {
  edges.value.push({
    id: `e${source}-${target}`,
    source,
    target,
    type: "smoothstep",
  });
};

const onEdgeUpdate = (oldEdge, newConnection) => {
  edges.value = edges.value.filter((e) => e.id !== oldEdge.id);
  onConnect(newConnection);
};

// Clear up route on refresh
onMounted(() => {
  router.push("/");
});
</script>

<style>
.vue-flow__handle {
  --handle-size: 7px;
  --handle-color: #03dac6;

  width: var(--handle-size) !important;
  height: var(--handle-size) !important;
  background-color: var(--handle-color) !important;
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
  background-color: var(--handle-color) !important;
  transform: translateX(-50%) scale(1.2) !important;
}

.vue-flow__connection-path {
  stroke: var(--handle-color);
  stroke-width: 2;
}

.vue-flow__handle-connecting,
.vue-flow__handle-valid {
  display: none !important;
}
</style>
