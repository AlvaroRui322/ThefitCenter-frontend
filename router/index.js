import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Exercises from "../views/Exercises.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Contact from "../views/Contact.vue";
import ExerciseDetail from "../views/ExerciseDetail.vue";


const routes = [
    { path: "/", component: Home },
    { path: "/profile", component: Profile },
    { path: "/exercises", component: Exercises },
    { path: "/exercises/:id", component: ExerciseDetail, props: true},
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/contact", component: Contact },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
