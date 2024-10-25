import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { initialNodes, initialEdges } from "../utils/initialData";
import { createBaseNode, createNodeByType } from "../utils/nodeUtils";

export const useFlowchartStore = defineStore("nodes", () => {
  const nodes = ref(initialNodes);
  const edges = ref(initialEdges);

  const addNode = (newNode) => {
    const id = (nodes.value.length + 1).toString();
    const baseNode = createBaseNode(id, newNode.type, newNode.title);
    const typeSpecificData = createNodeByType(newNode.type);

    const newNodeObj = {
      ...baseNode,
      data: {
        ...baseNode.data,
        description: newNode.description,
        ...typeSpecificData,
      },
    };

    nodes.value.push(newNodeObj);
  };

  const getNodeById = (nodeId) => {
    return nodes.value.find((n) => n.id === nodeId);
  };

  const updateNode = (nodeId, newTitle, newDescription) => {
    const node = getNodeById(nodeId);
    if (!node) return;

    node.label = node.label !== newTitle ? newTitle : node.label;
    node.description =
      node.description !== newDescription ? newTitle : node.description;

    // need to expand to other node types also
  };

  const deleteNode = (nodeId) => {
    edges.value = edges.value.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    nodes.value = nodes.value.filter((node) => node.id !== nodeId);
  };

  // not sure why we need this
  const getNodeData = computed(() => (nodeId) => {
    let node = getNodeById(nodeId);
    if (!node) {
      throw new Error("failed to find that node");
    }
    return node;
  });

  return {
    nodes,
    edges,
    addNode,
    getNodeById,
    updateNode,
    deleteNode,
    getNodeData,
  };
});
