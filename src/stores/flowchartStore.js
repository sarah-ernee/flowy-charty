import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFlowchartStore = defineStore("nodes", () => {
  const nodes = ref([
    {
      id: "1",
      parentId: -1,
      type: "custom",
      label: "Trigger Point",
      position: { x: 250, y: 5 },
      data: {
        description: "Conversation has been initiated.",
        icon: "⚡",
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
    {
      id: "2",
      type: "custom",
      label: "Business Hours",
      position: { x: 250, y: 200 },
      data: {
        description: "Business Hours - UTC",
        icon: "📅",
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
    {
      id: "3",
      type: "custom",
      label: "Welcome Message",
      position: { x: 100, y: 500 },
      data: {
        description: "Hello there, welcome to the chat!",
        icon: "✉️",
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
    {
      id: "4",
      type: "custom",
      label: "Away Message",
      position: { x: 400, y: 500 },
      data: {
        description:
          "Sorry, we are currently away. We will respond as soon as possible.",
        icon: "✉️",
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
    {
      id: "5",
      type: "custom",
      label: "Add Comment #1",
      position: { x: 400, y: 700 },
      data: {
        description: "User message during off hours.",
        icon: "💬",
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
  ]);

  const edges = ref([
    { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      type: "smoothstep",
      label: "Success",
      labelBgPadding: [8, 8],
      labelBgBorderRadius: 4,
      labelStyle: {
        fontSize: "16px",
        fontWeight: "bold",
        fill: "white",
      },
      labelBgStyle: {
        fill: "#018786",
      },
      updatable: false,
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      type: "smoothstep",
      label: "Failure",
      labelBgPadding: [8, 8],
      labelBgBorderRadius: 4,
      labelStyle: {
        fontSize: "16px",
        fontWeight: "bold",
        fill: "white",
      },
      labelBgStyle: {
        fill: "#B00020",
      },
      updatable: false,
    },
    { id: "e4-5", source: "4", target: "5", type: "smoothstep" },
  ]);

  const addNode = (newNode) => {
    const id = (nodes.value.length + 1).toString();
    const newNodeObj = {
      id,
      type: "custom",
      label: newNode.title,
      position: { x: -50, y: -10 },
      data: {
        description: newNode.description,
        icon: getIcon(newNode.type),
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    };

    nodes.value.push(newNodeObj);
  };

  const getIcon = (type) => {
    switch (type) {
      case "sendMessage":
        return "✉️";
      case "addComment":
        return "💬";
      case "businessHours":
        return "📅";
      default:
        return "🔧";
    }
  };

  const onConnect = (params) => {
    const newEdge = {
      id: `e${params.source}-${params.target}`,
      source: params.source,
      target: params.target,
      type: "smoothstep",
    };
    edges.value.push(newEdge);
  };

  const onEdgeUpdate = (oldEdge, newConnection) => {
    edges.value = edges.value.filter((e) => e.id !== oldEdge.id);
    onConnect(newConnection);
  };

  // Node details related function
  const getNodeById = (nodeId) => {
    return nodes.value.find((n) => n.id === nodeId);
  };

  const updateNode = (nodeId, newTitle, newDescription) => {
    const node = getNodeById(nodeId);

    if (!node) {
      return;
    }

    node.label = node.label !== newTitle ? newTitle : node.label;
    node.description =
      node.description !== newDescription ? newTitle : node.description;
  };

  const deleteNode = (nodeId) => {
    // Remove all edges connected to this node
    edges.value = edges.value.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    nodes.value = nodes.value.filter((node) => node.id !== nodeId);
  };

  const getNodeData = computed(() => (nodeId) => {
    const node = getNodeById(nodeId);
    if (!node) {
      return {
        label: "Node Not Found",
        data: {
          description: "",
          icon: "",
        },
      };
    }

    return {
      label: node.label,
      data: {
        description: node.data.description,
        icon: node.data.icon,
      },
    };
  });

  return {
    nodes,
    edges,
    addNode,
    onConnect,
    onEdgeUpdate,
    getNodeById,
    updateNode,
    deleteNode,
    getNodeData,
  };
});
