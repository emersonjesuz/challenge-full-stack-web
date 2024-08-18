import vuetifyConfig from "@/config/vuetify";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(vuetifyConfig);

app.mount("#app");
