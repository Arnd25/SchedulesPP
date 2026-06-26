import * as XLSX from 'xlsx'
import { Group, Schedule, TimeSlot } from '../models'
import { TIME_SLOTS } from '../constants/schedule.constants'
import { formatScheduleDate, formatScheduleDateFull } from './schedule.utils'

interface ExportToExcelOptions {
    dateStr: string
    groups: Group[]
    schedules: Schedule[]
    timeSlots?: readonly TimeSlot[]  // ← changed to readonly
    fileName?: string
}

export function exportScheduleToExcel({
    dateStr,
    groups,
    schedules,
    timeSlots = TIME_SLOTS,  // ✅ now works
    fileName,
}: ExportToExcelOptions): void {
    const workbook = XLSX.utils.book_new()
    const data: any[][] = []

    // Заголовок
    data.push([`Расписание на ${formatScheduleDate(dateStr)}`])
    data.push([])

    // Шапка таблицы
    const headerRow = ['Время', ...groups.map((g) => g.name)]
    data.push(headerRow)

    // Данные по временным слотам
    timeSlots.forEach((slot) => {  // ✅ readonly arrays work with forEach
        const row: any[] = [slot.time]

        groups.forEach((group) => {
            const schedule = schedules.find(
                (s) =>
                    s.lessonNumber === slot.lessonNumber &&
                    s.pair.groupId === group.id
            )

            if (schedule) {
                row.push(
                    `${schedule.pair.discipline.name}\n` +
                        `Преподаватель: ${schedule.pair.teacher.name}\n` +
                        `Аудитория: ${schedule.pair.audience}`
                )
            } else {
                row.push('Занятий нет')
            }
        })

        data.push(row)
    })

    // Создаем лист
    const worksheet = XLSX.utils.aoa_to_sheet(data)

    // Настройка ширины колонок
    worksheet['!cols'] = [
        { wch: 15 }, // Время
        ...groups.map(() => ({ wch: 35 })), // Группы
    ]

    // Объединение ячеек для заголовка
    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: groups.length } },
    ]

    // Добавляем лист в книгу
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Расписание')

    // Скачиваем файл
    const finalFileName = fileName || `расписание-${dateStr}.xlsx`
    XLSX.writeFile(workbook, finalFileName)
}

/**
 * Расширенный экспорт
 */
export function exportScheduleToExcelAdvanced({
    dateStr,
    groups,
    schedules,
    timeSlots = TIME_SLOTS,  // ✅ now works
    fileName,
}: ExportToExcelOptions): void {
    const workbook = XLSX.utils.book_new()
    const data: any[][] = []

    // Главный заголовок
    data.push(['Расписание занятий'])
    data.push([`Дата: ${formatScheduleDateFull(dateStr)}`])
    data.push([])

    // Шапка
    data.push(['№', 'Время', ...groups.flatMap((g) => [g.name, ''])])

    // Данные
    timeSlots.forEach((slot) => {  // ✅ readonly arrays work with forEach
        const row: any[] = [slot.lessonNumber, slot.time]

        groups.forEach((group) => {
            const schedule = schedules.find(
                (s) =>
                    s.lessonNumber === slot.lessonNumber &&
                    s.pair.groupId === group.id
            )

            if (schedule) {
                row.push(schedule.pair.discipline.name)
                row.push(
                    `${schedule.pair.teacher.name}\nАуд. ${schedule.pair.audience}`
                )
            } else {
                row.push('Занятий нет')
                row.push('')
            }
        })

        data.push(row)
    })

    const worksheet = XLSX.utils.aoa_to_sheet(data)

    // Ширина колонок
    worksheet['!cols'] = [
        { wch: 4 }, // №
        { wch: 15 }, // Время
        ...groups.flatMap(() => [
            { wch: 25 }, // Дисциплина
            { wch: 30 }, // Преподаватель + аудитория
        ]),
    ]

    // Объединение заголовков
    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 2 + groups.length * 2 - 1 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 2 + groups.length * 2 - 1 } },
    ]

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Расписание')

    const finalFileName = fileName || `расписание-${dateStr}.xlsx`
    XLSX.writeFile(workbook, finalFileName)
}