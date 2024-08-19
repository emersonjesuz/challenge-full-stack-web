import vuetifyConfig from "@/config/vuetify";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import { pinia } from "./config/pinia";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetifyConfig);

app.mount("#app");
