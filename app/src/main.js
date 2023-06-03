import { createApp } from "vue";
import "@/scss/main.scss";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "@/App.vue";
import Play from "@/Play.vue";
import Login from "@/components/Login.vue";

const Home = { template: "<div>Home</div>" };

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
