import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    props: true
  },
  {
    path: "/About",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/Projects",
    name: "Projects",
    component: () => import("../views/Projects.vue")
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "/Resume",
    name: "Resume",
    component: () => import("../views/Resume.vue")
  },
  {
    path: "/Projects/Project",
    name: "ProjectDisplay",
    props: route => ({ projectName: route.query.projectName }),
    component: () => import("../views/ProjectDisplay.vue")
  },
  {
    path: "/Content",
    name: "Content",
    component: () => import("../views/Content.vue")
  },
  {
    path: "/Content/ContDisplay",
    name: "ContentDisplay",
    props: route => ({ contentName: route.query.contentName }),
    component: () => import("../views/ContentDisplay.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
