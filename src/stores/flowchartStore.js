import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFlowchartStore = defineStore("nodes", () => {
  const nodes = ref([
    {
      id: "1",
      parentId: -1,
      type: "trigger",
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
      type: "businessHours",
      label: "Business Hours",
      position: { x: 250, y: 200 },
      data: {
        description: "Business Hours - Details",
        icon: "📅",
        times: [
          { startTime: "09:00", endTime: "17:00", day: "Mon" },
          { startTime: "09:00", endTime: "17:00", day: "Tue" },
          { startTime: "09:00", endTime: "17:00", day: "Wed" },
          { startTime: "09:00", endTime: "17:00", day: "Thu" },
          { startTime: "09:00", endTime: "17:00", day: "Fri" },
          { startTime: "09:00", endTime: "17:00", day: "Sat" },
          { startTime: "09:00", endTime: "17:00", day: "Sun" },
        ],
        timezone: "UTC",
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
    {
      id: "3",
      type: "sendMessage",
      label: "Welcome Message",
      position: { x: 100, y: 500 },
      data: {
        description: "Welcome message sent.",
        icon: "✉️",
        text: "Hello there, welcome to the chat!",
        attachments: [
          "https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58",
        ],
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
    {
      id: "4",
      type: "sendMessage",
      label: "Away Message",
      position: { x: 400, y: 500 },
      data: {
        description: "Away message sent.",
        icon: "✉️",
        text: "Sorry, we are currently away. We will respond as soon as possible.",
        attachments: [],
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    },
    {
      id: "5",
      type: "addComment",
      label: "Add Comment #1",
      position: { x: 400, y: 700 },
      data: {
        description: "User message during off hours",
        icon: "💬",
        comment: "Default test comment",
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

  const nodeIcons = {
    sendMessage: "✉️",
    addComment: "💬",
    businessHours: "📅",
    default: "🔧",
    trigger: "⚡",
  };

  const addNode = (newNode) => {
    const id = (nodes.value.length + 1).toString();

    // Base generic node details
    let newNodeObj = {
      id,
      type: newNode.type,
      label: newNode.title,
      position: { x: -50, y: -10 },
      data: {
        description: newNode.description,
        icon: nodeIcons[newNode.type] || nodeIcons["default"],
      },
      connectable: true,
      handles: [
        { type: "source", position: "bottom" },
        { type: "target", position: "top" },
      ],
    };

    // Apppend sendMessage node details
    if (newNode.type == "sendMessage") {
      newNodeObj.data.text = "";
      newNodeObj.data.attachments = [];
    }

    // Append businessHours node details
    if (newNode.type == "businessHours") {
      newNodeObj.data.times = [
        { startTime: "09:00", endTime: "17:00", day: "Mon" },
        { startTime: "09:00", endTime: "17:00", day: "Tue" },
        { startTime: "09:00", endTime: "17:00", day: "Wed" },
        { startTime: "09:00", endTime: "17:00", day: "Thu" },
        { startTime: "09:00", endTime: "17:00", day: "Fri" },
        { startTime: "09:00", endTime: "17:00", day: "Sat" },
        { startTime: "09:00", endTime: "17:00", day: "Sun" },
      ];
      newNodeObj.data.timezone = "UTC";
    }

    // Append addComment node details
    if (newNode.type == "addComment") {
      newNodeObj.data.comments = "Default test comment";
    }
    nodes.value.push(newNodeObj);
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
    onConnect,
    onEdgeUpdate,
    getNodeById,
    updateNode,
    deleteNode,
    getNodeData,
  };
});
