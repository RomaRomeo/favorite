import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/advert",
    name: "advert",
    meta: { layout: "main" },
    component: () => import("../views/Advert.vue"),
  },
  {
    path: "/internet",
    name: "internet",
    meta: { layout: "main" },
    component: () => import("../views/Internet.vue"),
  },
  {
    path: "/tv",
    name: "tv",
    meta: { layout: "main" },
    component: () => import("../views/Tv.vue"),
  },
  {
    path: "/payment",
    name: "payment",
    meta: { layout: "main" },
    component: () => import("../views/Payment.vue"),
  },
  {
    path: "/support",
    name: "support",
    meta: { layout: "main" },
    component: () => import("../views/Support.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: { layout: "main" },
    component: () => import("../views/About.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "empty" },
    component: () => import("../views/Profile.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
