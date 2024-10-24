import { createRouter, createWebHistory } from "vue-router";
import NodeDetails from "../components/NodeDetails.vue";

const routes = [
  {
    path: "/node/:id",
    name: "NodeDetails",
    component: NodeDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
