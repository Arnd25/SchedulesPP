"use server"
import { api } from "@/config/http/server.http";
import { API_ROUTES } from "@/shared/routes/api.route";

export async function logout() {
    await api.post(API_ROUTES.AUTH.LOGOUT(), {});
}