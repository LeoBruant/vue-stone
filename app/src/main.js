import App from "@/App.vue";
import Home from "@/Home.vue";
import Play from "@/Play.vue";
import Login from "@/Login.vue";
import Shop from "@/checkout/Shop.vue";
import Success from "@/checkout/Success.vue";
import Cancelled from "@/checkout/Cancelled.vue";
import DeckSelector from "@/DeckSelector.vue";
import "@/scss/main.scss";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/play", component: Play },
  { path: "/login", component: Login },
  { path: "/shop", component: Shop },
  { path: "/checkout/success", component: Success },
  { path: "/checkout/cancelled", component: Cancelled },
  { path: "/profile/deckSelector", component: DeckSelector },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
