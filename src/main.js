import App from "./App.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark", // Set the default theme to dark
    // themes: {
    //   dark: {
    //     dark: true, // Specify that this theme is dark
    //     colors: {
    //       background: "#121212", // Optional: Customize background color for the dark theme
    //       surface: "#1e1e1e", // Customize surface color
    //       primary: "#bb86fc", // Customize primary color
    //       secondary: "#03dac6", // Customize secondary color
    //       // Add more color options if needed
    //     },
    //   },
    // },
  },
});

const pinia = createPinia();

const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.mount("#app");
