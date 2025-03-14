import api from "../api";

export async function register(user) {
    return api.post("/register", user);
}

export async function login(credentials) {
    return api.post("/login", credentials);
}

export async function logout() {
    return api.post("/logout");
}

export async function getUser() {
    return api.get("/user");
}