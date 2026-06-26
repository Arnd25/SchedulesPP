import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Некорректный email адрес"),
    password: z.string()
        .min(6, "Минимальная длина пароля 6 символов")
        .max(12, "Максимальная длина пароля 12 символов"),
});

export type LoginFormValidated = z.infer<typeof loginSchema>;