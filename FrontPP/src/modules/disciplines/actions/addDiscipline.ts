'use server';

import { api } from '@/config/http/server.http';
import { API_ROUTES } from '@/shared/routes/api.route';
import { APP_ROUTES } from '@/shared/routes/app.route';
import { revalidatePath } from 'next/cache';

export async function createDiscipline(prevState: any, formData: FormData) {
    const name = formData.get('discipline') as string;

    if (!name || name.trim() === '') {
        return { error: 'Введите название дисциплины' };
    }

    const trimmedName = name.trim();

    const response = await api.post(API_ROUTES.disciplines.CREATE(), {
        name: trimmedName
    });


    if (response.error) {
        return {
            error: response.error
        };
    }

    revalidatePath(APP_ROUTES.discipline());

    return {
        success: true,
        message: `Дисциплина "${trimmedName}" добавлена`
    };
}