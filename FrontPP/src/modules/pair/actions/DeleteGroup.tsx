'use server';

import { api } from '@/config/http/server.http';
import { API_ROUTES } from '@/shared/routes/api.route';
import { APP_ROUTES } from '@/shared/routes/app.route';
import { revalidatePath } from 'next/cache';

export async function DeleteGroup(formData: FormData) {
  const id = formData.get('id') as string;

  try {
    await api.delete(API_ROUTES.group.DELETE(id));
    console.log('Delete discipline:', id);
    revalidatePath(APP_ROUTES.group())
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
}