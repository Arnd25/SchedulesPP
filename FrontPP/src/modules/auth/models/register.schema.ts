import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string()
        .min(2, "Минимальное кол-во символов 2")
        .max(50, "Максимальное кол-во символов 50"),
    lastName: z.string()
        .min(2, "Минимальное кол-во символов 2")
        .max(50, "Максимальное кол-во символов 50"),
    email: z.string().email("Некорректный email адрес"),
    password: z.string()
        .min(6, "Минимальная длина пароля 6 символов")
        .max(12, "Максимальная длина пароля 12 символов"),
    passwordConfirm: z.string().min(1, 'Подтвердите пароль').optional(), // Добавили .optional()
}).refine((data) => {
    if (data.passwordConfirm && data.password !== data.passwordConfirm) {
        return {
            message: 'Пароли не совпадают',
            path: ['passwordConfirm'],
        };
    }
    return true;
});

export type RegisterFormValidated = z.infer<typeof registerSchema>;