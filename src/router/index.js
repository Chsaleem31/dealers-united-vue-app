// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/LoginView.vue";
import Signup from "../views/SignupView.vue";
import AddMessage from "../views/AddMessage.vue";
import MessageList from "../views/MessageList.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/add-message", component: AddMessage },
  { path: "/message-list", component: MessageList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
