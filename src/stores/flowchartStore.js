import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlowchartStore = defineStore("nodes", () => {
  const nodes = ref([
    {
      id: "1",
      type: "input",
      position: { x: 50, y: 50 },
      data: {
        label: "Trigger",
        description: "Conversation opened",
        icon: "⚡",
        style: { border: "solid 1px #ececec" },
      },
    },
    {
      id: "2",
      type: "input",
      position: { x: 50, y: 100 },
      data: {
        label: "Business Hours",
        description: "Business hours - UTC",
        icon: "📅",
      },
    },
  ]);

  return { nodes };
});
