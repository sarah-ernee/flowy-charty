<template>
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :connectable="true"
    :enable-connection-on-handle-hover="false"
    @connect="onConnect"
  />
</template>

<script setup>
import { ref } from "vue";
import { VueFlow } from "@vue-flow/core";

const nodes = ref([
  {
    id: "1",
    type: "input",
    label: "Node 1",
    position: { x: 250, y: 5 },
    connectable: true,
    // Remove sourcePosition and targetPosition
    handles: [
      { type: "source", position: "bottom" },
      { type: "target", position: "top" },
    ],
  },
  {
    id: "2",
    type: "input",
    label: "Node 2",
    position: { x: 100, y: 100 },
    connectable: true,
    handles: [
      { type: "source", position: "bottom" },
      { type: "target", position: "top" },
    ],
  },
  {
    id: "3",
    label: "Node 3",
    position: { x: 400, y: 100 },
    connectable: true,
    handles: [
      { type: "source", position: "bottom" },
      { type: "target", position: "top" },
    ],
  },
  {
    id: "4",
    label: "Node 4",
    position: { x: 400, y: 200 },
    connectable: true,
    handles: [
      { type: "source", position: "bottom" },
      { type: "target", position: "top" },
    ],
  },
]);

const edges = ref([
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
]);

const onConnect = (params) => {
  edges.value.push({
    id: `e${params.source}-${params.target}`,
    source: params.source,
    target: params.target,
  });
};
</script>

<style></style>
