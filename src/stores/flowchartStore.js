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
      data: {
        ...baseNode.data,
        description: newNode.description,
        ...typeSpecificData,
      },
    };

    nodes.value.push(newNodeObj);
  };

  // const updateNode = (nodeId, updatedData) => {
  //   const nodeIndex = nodes.value.findIndex((n) => n.id === nodeId);
  //   if (nodeIndex === -1) {
  //     console.error("Failed to update node");
  //     return;
  //   }

  //   nodes.value[nodeIndex] = {
  //     ...nodes.value[nodeIndex],
  //     label: updatedData.label || nodes.value[nodeIndex].label,
  //     data: {
  //       ...nodes.value[nodeIndex].data,
  //       description: updatedData.description,

  //       // Type-specific updates
  //       ...(updatedData.comment !== undefined && {
  //         comment: updatedData.comment,
  //       }),
  //       ...(updatedData.text !== undefined && { text: updatedData.text }),
  //       ...(updatedData.times !== undefined && { times: updatedData.times }),
  //       ...(updatedData.timezone !== undefined && {
  //         timezone: updatedData.timezone,
  //       }),
  //     },
  //   };

  //   // Sanity check to ensure reactivity
  //   nodes.value = [...nodes.value];
  // };

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
                ...updateData,
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
    // getNodeData,
  };
});
