import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus';
import '@/assets/css/element-variables.scss';

const app = createApp(App).use(store).use(router).mount("#app");
app.use(ElementPlus)