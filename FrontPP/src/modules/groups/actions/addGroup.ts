'use server';

import { api } from '@/config/http/server.http';
import { API_ROUTES } from '@/shared/routes/api.route';
import { APP_ROUTES } from '@/shared/routes/app.route';
import { revalidatePath } from 'next/cache';

export async function createGroup(prevState: any, formData: FormData) {
  const name = formData.get('group') as string;
  const shift = formData.get('Shift') as string;
  const department = formData.get('Department')

  if (!name || name.trim() === '') {
    return { error: 'Введите название группы' };
  }

  try {
    await api.post(API_ROUTES.group.CREATE(), { name, shift, department });

    console.log('Creating group:', name, shift, department);

    revalidatePath(APP_ROUTES.group());

    return { success: true, message: 'Дисциплина добавлена' };
  } catch (error) {
    return { error: 'Ошибка при создании дисциплины' };
  }
}