import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login";
import ListUsers from "../components/ListUsers";
import UpdateUser from "../components/UpdateUser";
import CheckIn from "../components/CheckIn";
import ListCheckIn from "../components/ListCheckIn";
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/all-users",
    name: "all-users",
    component: ListUsers,
  },
  {
    path: "/update-user/:id",
    name: "update-user",
    component: UpdateUser,
  },
  {
    path: "/check-in",
    name: "check-in",
    component: CheckIn,
  },
  {
    path: "/list-check-in",
    name: "list-check-in",
    component: ListCheckIn,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
