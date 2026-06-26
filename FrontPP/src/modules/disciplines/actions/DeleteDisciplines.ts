'use server';

import { api } from '@/config/http/server.http';
import { API_ROUTES } from '@/shared/routes/api.route';
import { revalidatePath } from 'next/cache';

export async function DeleteDiscipline(formData: FormData) {
    const id = formData.get('id') as string;

    try {
        await api.delete(API_ROUTES.disciplines.DELETE(id));
        console.log('Delete discipline:', id);
        revalidatePath('/disciplines');
    } catch (error) {
        console.error('Ошибка при удалении:', error);
    }
}