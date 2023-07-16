import App from "@/App.vue";
import Home from "@/Home.vue";
import Play from "@/Play.vue";
import Login from "@/components/Login.vue";
import "@/scss/main.scss";
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

const app = createApp(App);
app.use(router);

app.mount("#app");
