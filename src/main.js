import App from "./App.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@vue-flow/core/dist/style.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const pinia = createPinia();

const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.mount("#app");
