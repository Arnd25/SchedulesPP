"use server"

import { z } from 'zod';
import { api } from "@/config/http/server.http";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ActionConfig<T> {
    schema: z.ZodSchema<T>;
    endpoint: string;
    revalidate?: string;
    redirectTo?: string;
    isMultipart?: boolean;
}

export async function serviceAction<T>(config: ActionConfig<T>, data: any) {
    let rawData: any;

    if (data instanceof FormData) {
        rawData = Object.fromEntries(data.entries());

        if (data.has("image")) {
            rawData.image = data.get("image");
        }
    } else {
        rawData = data;
    }

    const validated = config.schema.safeParse(rawData);
    if (!validated.success) {
        console.error("Серверная ошибка при валидации:", validated.error.flatten().fieldErrors);
        return { fieldErrors: validated.error.flatten().fieldErrors as Record<string, string[]> };
    }

    let payload: any;
    if (config.isMultipart) {
        const fData = new FormData();

        Object.entries(validated.data as any).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "" && key !== "image") {
                fData.append(key, typeof value === "boolean" ? String(value) : (value as any));
            }
        });

        if (data instanceof FormData) {
            const file = data.get("image");
            if (file instanceof File && file.size > 0) {
                fData.append("image", file);
            }
        }

        payload = fData;
    } else {
        payload = validated.data;
    }

    console.log('Отправка на API: ', config.endpoint);
    const { error } = await api.post(config.endpoint, payload);

    if (error) {
        console.error("API: ", error);
        return { error };
    }

    if (config.revalidate) revalidatePath(config.revalidate);
    if (config.redirectTo) redirect(config.redirectTo);

    return { ok: true };
}