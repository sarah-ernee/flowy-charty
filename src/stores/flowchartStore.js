import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlowchartStore = defineStore("nodes", () => {
  const nodes = ref([
    {
      id: "1",
      type: "custom",
      label: "Trigger Point",
      position: { x: 250, y: 5 },
      data: {
        description: "Conversation has been initiated.",
        icon: "⚡",
      },
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
    },
    {
      id: "3",
      type: "custom",
      label: "Welcome Message",
      position: { x: 100, y: 400 },
      data: {
        description: "Hello there, welcome to the chat!",
        icon: "📅",
      },
    },
    {
      id: "4",
      type: "custom",
      label: "Away Message",
      position: { x: 400, y: 400 },
      data: {
        description:
          "Sorry, we are currently away. We will respond as soon as possible.",
        icon: "📅",
      },
    },
    {
      id: "5",
      type: "custom",
      label: "Add Comment #1",
      position: { x: 400, y: 600 },
      data: {
        description: "User message during off hours.",
        icon: "📅",
      },
    },
  ]);

  const edges = ref([
    { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
    { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
    { id: "e2-4", source: "2", target: "4", type: "smoothstep" },
    { id: "e4-5", source: "4", target: "5", type: "smoothstep" },
  ]);

  return { nodes, edges };
});
