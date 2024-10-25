import { defaultBusinessHours } from "./nodeUtils";

export const initialNodes = [
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
      times: defaultBusinessHours,
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
];

export const initialEdges = [
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
];
