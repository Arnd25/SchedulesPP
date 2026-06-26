"use server"

import { api } from '@/config/http/server.http'
import { API_ROUTES } from '@/shared/routes/api.route'
import { revalidatePath } from 'next/cache'
import { APP_ROUTES } from '@/shared/routes/app.route'

export async function DeleteUser(userId: string) {
    try {
        const result = await api.delete(API_ROUTES.USERS.DELETE(userId))

        if (result.error) {
            return { success: false, message: result.error }
        }

        revalidatePath(APP_ROUTES.users())
        return { success: true, message: 'Пользователь удалён' }
    } catch (error) {
        return { success: false, message: 'Не удалось удалить пользователя' }
    }
}


export interface UpdateUserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: File | null;
}

export async function UpdateUser(user: UpdateUserData) {
    try {
        const formData = new FormData();
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('role', user.role);

        if (user.avatar) {
            formData.append('file', user.avatar);
        }
        const response = await api.patch(API_ROUTES.USERS.UPDATE(user.id), formData);


        if (response.error) {
            return {
                success: false,
                message: response.error,
            };
        }
        revalidatePath(APP_ROUTES.users());

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



