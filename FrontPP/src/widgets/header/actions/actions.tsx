'use server';

import { api } from '@/config/http/server.http';
import { API_ROUTES } from '@/shared/routes/api.route';
import { APP_ROUTES } from '@/shared/routes/app.route';
import { revalidatePath } from 'next/cache';

export interface User {
    firstName: string;
    lastName: string;
    avatar: string;
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const { data } = await api.get<User>(API_ROUTES.USERS.ME());
        return data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}

export async function logout() {
    await api.post(API_ROUTES.AUTH.LOGOUT(), {});
}


interface UserForm {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: File | null;
}

export async function UpdateProfile(user: UserForm) {
    try {
        const formData = new FormData();
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('role', user.role);

        if (user.avatar) {
            formData.append('file', user.avatar);
        }
        const response = await api.patch(API_ROUTES.USERS.ME(), formData);


        if (response.error) {
            return {
                success: false,
                message: response.error,
            };
        }

        return {
            success: true,
            data: response.data,
            message: "Пользователь успешно обновлён",
        };
    } catch (error) {
        return {
            success: false,
            message: "Ошибка при обновлении пользователя",
        };
    }
}
