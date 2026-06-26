import {cookies} from "next/headers";
import {parseJwt} from "@/shared/lib/utils";

export async function getAccessToken() {
    const store = await cookies();
    return store.get("access_token")?.value;
}

export async function getRefreshToken() {
    const store = await cookies();
    return store.get("refresh_token")?.value;
}

export async function hasAuthCookies() {
    const refresh = await getRefreshToken();
    return !!refresh;
}

export async function getAllAuthCookies() {
    const store = await cookies();
    return {
        access_token: store?.get("access_token")?.value,
        refresh_token: store?.get("refresh_token")?.value,
    };
}

export async function getUserDataFromCookies() {
    const token = await getAccessToken();
    if (!token) return null;

    const payload = parseJwt(token);
    if (!payload) return null;

    return {
        role: payload.role as string,
        userId: payload.sub as string,
        email: payload.email as string,
    };
}