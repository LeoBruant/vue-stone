import App from "@/App.vue";
import Home from "@/Home.vue";
import Play from "@/Play.vue";
import Login from "@/Login.vue";
import "@/scss/main.scss";
import { createPinia } from 'pinia';
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/play", component: Play },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia)

app.mount("#app");
