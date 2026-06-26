export interface GenerateScheduleRequest {
    date: string
    groupIds?: string[]
    maxLessonsPerDay?: number
}

export interface GenerateScheduleResponse {
    message: string
    count: number
    date: string
    groupIds: string[]
}

export function logGenerateSchedule(
    groupId: string,
    groupName: string,
    date: string
): void {
    console.log('📝 Генерация расписания:')
    console.log('  - Группа:', groupName)
    console.log('  - ID группы:', groupId)
    console.log('  - Дата:', date)
    console.log('ℹ️ Это действие генерирует расписание для выбранной группы на выбранную дату')
}