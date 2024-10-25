export const nodeIcons = {
  sendMessage: "✉️",
  addComment: "💬",
  businessHours: "📅",
  default: "🔧",
  trigger: "⚡",
};

export const defaultBusinessHours = [
  { startTime: "09:00", endTime: "17:00", day: "Mon" },
  { startTime: "09:00", endTime: "17:00", day: "Tue" },
  { startTime: "09:00", endTime: "17:00", day: "Wed" },
  { startTime: "09:00", endTime: "17:00", day: "Thu" },
  { startTime: "09:00", endTime: "17:00", day: "Fri" },
  { startTime: "09:00", endTime: "17:00", day: "Sat" },
  { startTime: "09:00", endTime: "17:00", day: "Sun" },
];

export const createBaseNode = (id, type, title) => ({
  id,
  type,
  label: title,
  position: { x: -50, y: -10 },
  data: {
    description: "",
    icon: nodeIcons[type] || nodeIcons["default"],
  },
  connectable: true,
  handles: [
    { type: "source", position: "bottom" },
    { type: "target", position: "top" },
  ],
});

export const createNodeByType = (type) => {
  const baseData = {};

  switch (type) {
    case "sendMessage":
      return {
        text: "",
        attachments: [],
      };
    case "businessHours":
      return {
        times: defaultBusinessHours,
        timezone: "UTC",
      };
    case "addComment":
      return {
        comments: "Default test comment",
      };
    default:
      return baseData;
  }
};
