import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.css";
import { createPinia } from 'pinia'
const app = createApp(App);

app.use(createPinia(App))
app.use(router);
app.mount("#app");
