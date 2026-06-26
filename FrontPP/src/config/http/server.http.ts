import { cookies } from "next/headers";
import { ENV } from "@/shared/lib/constants";

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
    method: HttpMethod;
    endpoint: string;
    body?: Record<string, unknown> | FormData;
}

export async function httpConfig<T>(options: RequestOptions) {
    const { method, endpoint, body } = options;
    const store = await cookies();
    const allCookies = store.toString();

    const isFormData = body instanceof FormData;

    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Cookie': allCookies,
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${ENV.API_URL}${endpoint}`, {
            method,
            headers,
            body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
            cache: "no-cache",
        });

        const setCookieHeader = response.headers.get("set-cookie");

        if (setCookieHeader) {
            const cookieEntries = setCookieHeader.split(/,(?=[^;]+?=)/);
            for (const entry of cookieEntries) {
                const [nameValue] = entry.split(";");
                const [name, value] = nameValue.split("=");
                store.set(name.trim(), value.trim(), {
                    httpOnly: true,
                    secure: ENV.NODE_ENV === "production",
                    path: name.trim() === "refresh_token" ? "/api/auth/refresh" : "/",
                    sameSite: "lax",
                });
            }
        }

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            const message = Array.isArray(result.message) ? result.message.join(". ") : result.message;
            return { data: null, error: message || "Ошибка запроса", status: response.status };
        }

        return { data: result as T, error: null, status: response.status };
    } catch (_error) {
        return { data: null, error: "Ошибка соединения", status: 500 };
    }
}

export const api = {
    get: <T>(endpoint: string) => httpConfig<T>({ method: 'GET', endpoint }),
    post: <T>(endpoint: string, body: Record<string, unknown> | FormData) => httpConfig<T>({ method: 'POST', endpoint, body }),  // ✅ Заменено any
    patch: <T>(endpoint: string, body: Record<string, unknown> | FormData) => httpConfig<T>({ method: 'PATCH', endpoint, body }),  // ✅ Заменено any
    delete: <T>(endpoint: string) => httpConfig<T>({ method: "DELETE", endpoint }),
};