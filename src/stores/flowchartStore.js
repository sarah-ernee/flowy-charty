import { defineStore } from "pinia";
import { ref } from "vue";

import { initialNodes, initialEdges } from "../utils/initialData";
import { createBaseNode, createNodeByType } from "../utils/nodeUtils";

export const useFlowchartStore = defineStore("nodes", () => {
  const nodes = ref(initialNodes);
  const edges = ref(initialEdges);

  // Crud functions related to node
  const getNodeById = (nodeId) => {
    let node = nodes.value.find((n) => n.id === nodeId);
    if (!node) {
      console.error(`${nodeId} node was not found`);
      return;
    }
    return node;
  };

  const addNode = (newNode) => {
    const id = (nodes.value.length + 1).toString();
    const baseNode = createBaseNode(id, newNode.type, newNode.title);
    const typeSpecificData = createNodeByType(newNode.type);

    const newNodeObj = {
      ...baseNode,
      position: {
        x: -300,
        // Shift new nodes below previously created node
        y: 20 + (nodes.value.length - 5) * 150,
      },
      data: {
        ...baseNode.data,
        description: newNode.description,
        ...typeSpecificData,
      },
    };

    console.log(newNodeObj.position);

    nodes.value.unshift(newNodeObj);
  };

  const updateNode = (id, updateData) => {
    const nodeIndex = nodes.value.findIndex((node) => node.id === id);
    if (nodeIndex !== -1) {
      // Create a new nodes array with the updated node
      nodes.value = nodes.value.map((node) =>
        node.id === id
          ? {
              ...node,
              label: updateData.label,
              data: {
                ...node.data,
                description: updateData.description,
                comment: updateData.comment,
                text: updateData.text,
                timezone: updateData.timezone,
                times: updateData.times,
                attachments: updateData.attachments,
              },
            }
          : node
      );
    }
  };

  const deleteNode = (nodeId) => {
    edges.value = edges.value.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    nodes.value = nodes.value.filter((node) => node.id !== nodeId);
  };

  return {
    nodes,
    edges,
    addNode,
    getNodeById,
    updateNode,
    deleteNode,
  };
});
