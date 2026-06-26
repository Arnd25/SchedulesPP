import { Schedule } from '../models'

export function formatDateToISO(date: Date): string {
    return date.toISOString().split('T')[0]
}

export function getDaySchedules(
    schedules: Schedule[] | null | undefined,
    dateStr: string
): Schedule[] {
    return (schedules ?? []).filter((schedule) => {
        const scheduleDate = schedule.date.split('T')[0]
        return scheduleDate === dateStr
    })
}

export function getScheduleForCell(
    daySchedules: Schedule[],
    lessonNumber: number,
    groupId: string
): Schedule | undefined {
    return daySchedules.find(
        (schedule) =>
            schedule.lessonNumber === lessonNumber &&
            schedule.pair.groupId === groupId
    )
}

export function formatScheduleDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function formatScheduleDateFull(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}