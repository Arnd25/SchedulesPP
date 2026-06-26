'use server';

import { api } from '@/config/http/server.http';
import { API_ROUTES } from '@/shared/routes/api.route';
import { APP_ROUTES } from '@/shared/routes/app.route';
import { revalidatePath } from 'next/cache';

type PairActionState = {
  error?: string;
  success?: boolean;
  message?: string;
} | null;

export async function createPair(prevState: PairActionState, formData: FormData) {
  const disciplineId = formData.get('DisciplineId') as string;
  const groupId = formData.get('groupId') as string;
  const teacherId = formData.get('TeacherId') as string;
  const audience = formData.get('audience') as string;
  const hours = formData.get('hours') as string;

  if (!disciplineId) {
    return { error: 'Выберите дисциплину' };
  }

  if (!teacherId) {
    return { error: 'Выберите преподавателя' };
  }

  if (!groupId) {
    return { error: 'Выберите группу' };
  }

  if (!audience || audience.trim() === '') {
    return { error: 'Введите аудиторию' };
  }

  if (!hours || hours.trim() === '') {
    return { error: 'Введите количество часов' };
  }

  const hoursNumber = Number(hours);
  if (isNaN(hoursNumber) || hoursNumber <= 0) {
    return { error: 'Некорректное количество часов' };
  }

  const response = await api.post(API_ROUTES.pairs.CREATE(), {
    disciplineId,
    groupId,
    teacherId,
    audience,
    hours: hoursNumber,
  });


  if (response.error) {
    return {
      error: response.error
    };
  }

  revalidatePath(APP_ROUTES.pair());

  return {
    success: true,
    message: 'Пара добавлена'
  };
}