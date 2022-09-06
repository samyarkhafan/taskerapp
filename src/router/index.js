import { createRouter, createWebHistory } from "vue-router";
import AllView from "@/views/AllView.vue";
import CreateView from "@/views/CreateView.vue";
import EditView from "@/views/EditView.vue";
import TodayView from "@/views/TodayView.vue";
import UndoneView from "@/views/UndoneView.vue";
import SignUpView from "@/views/SignUpView.vue";
import SignInView from "@/views/SignInView.vue";

const routes = [
  {
    path: "/",
    name: "today",
    component: TodayView,
    beforeEnter: () => {
      if (!localStorage.getItem("token")) {
        return { name: "signin" };
      }
    },
  },
  {
    path: "/undone",
    name: "undone",
    component: UndoneView,
    beforeEnter: () => {
      if (!localStorage.getItem("token")) {
        return { name: "signin" };
      }
    },
  },
  {
    path: "/all",
    name: "all",
    component: AllView,
    beforeEnter: () => {
      if (!localStorage.getItem("token")) {
        return { name: "signin" };
      }
    },
  },
  {
    path: "/create",
    name: "create",
    component: CreateView,
    beforeEnter: () => {
      if (!localStorage.getItem("token")) {
        return { name: "signin" };
      }
    },
  },
  {
    path: "/edit",
    name: "edit",
    component: EditView,
    beforeEnter: () => {
      if (!localStorage.getItem("token")) {
        return { name: "signin" };
      }
      if (!localStorage.getItem("task")) {
        return { name: "all" };
      }
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
