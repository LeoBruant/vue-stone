import App from "@/App.vue";
import Home from "@/Home.vue";
import Play from "@/Play.vue";
import Login from "@/Login.vue";
import "@/scss/main.scss";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Checkout from "@/Checkout.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/play", component: Play },
  { path: "/login", component: Login },
  { path: "/checkout", component: Checkout },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
