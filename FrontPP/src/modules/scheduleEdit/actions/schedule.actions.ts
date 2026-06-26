'use server'

import { api } from '@/config/http/server.http'
import { API_ROUTES } from '@/shared/routes/api.route'
import { revalidatePath } from 'next/cache'

export interface CreateScheduleRequest {
    pairId: string
    date: string
    lessonNumber: number
}

export interface GenerateScheduleRequest {
    groupId: string
    date: string
}

interface GenerateScheduleResponse {
    count?: number
    message?: string
    success?: boolean
}

interface DeleteDayScheduleResponse {
    count?: number
    message?: string
    success?: boolean
}

// ✅ Создание расписания
export async function createScheduleAction(
    data: CreateScheduleRequest
): Promise<{ success: boolean; error?: string }> {
    const response = await api.post(API_ROUTES.schedules.CREATE(), data)

    console.log('📝 Create schedule response:', response)

    if (response.error) {
        return { success: false, error: response.error }
    }

    revalidatePath('/edit')
    return { success: true }
}

// ✅ Удаление расписания
export async function deleteScheduleAction(
    id: string
): Promise<{ success: boolean; error?: string }> {
    const response = await api.delete(API_ROUTES.schedules.DELETE(id))

    console.log('🗑 Delete schedule response:', response)

    if (response.error) {
        return { success: false, error: response.error }
    }

    revalidatePath('/edit')
    return { success: true }
}

// ✅ Генерация расписания
export async function generateScheduleAction(
    data: GenerateScheduleRequest
) {
    const response = await api.post(API_ROUTES.schedules.GENERATE(), data)

    console.log('🎯 Generate schedule response:', response)

    if (response.error) {
        return {
            success: false,
            count: 0,
            error: response.error,
        }
    }

    const responseData = (response.data ?? {}) as GenerateScheduleResponse

    revalidatePath('/edit')

    return {
        success: true,
        count: responseData?.count ?? 0,
        message: responseData?.message,
    }
}

// ✅ Удаление расписания на день
export async function deleteDayScheduleAction(
    groupId: string,
    date: string
) {
    const response = await api.delete(API_ROUTES.schedules.DELETE_DAY(groupId, date))

    console.log('🗑 Delete day schedule response:', response)

    if (response.error) {
        return {
            success: false,
            count: 0,
            error: response.error,
        }
    }

    const responseData = (response.data ?? {}) as DeleteDayScheduleResponse

    revalidatePath('/edit')

    return {
        success: true,
        count: responseData?.count ?? 0,
        message: responseData?.message,
    }
}