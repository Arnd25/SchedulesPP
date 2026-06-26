import * as XLSX from 'xlsx'
import { Group, Schedule, TimeSlot } from '../models'
import { TIME_SLOTS } from '../constants/schedule.constants'
import { formatScheduleDate, formatScheduleDateFull } from './schedule.utils'

type ExcelCell = string | number
type ExcelRow = ExcelCell[]

interface ExportToExcelOptions {
    dateStr: string
    groups: Group[]
    schedules: Schedule[]
    timeSlots?: readonly TimeSlot[]
    fileName?: string
}

export function exportScheduleToExcel({
    dateStr,
    groups,
    schedules,
    timeSlots = TIME_SLOTS,
    fileName,
}: ExportToExcelOptions): void {
    const workbook = XLSX.utils.book_new()
    const data: ExcelRow[] = []  

    data.push([`Расписание на ${formatScheduleDate(dateStr)}`])
    data.push([])

    const headerRow: ExcelRow = ['Время', ...groups.map((g) => g.name)]
    data.push(headerRow)

    timeSlots.forEach((slot) => {
        const row: ExcelRow = [slot.time] 

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

    const worksheet = XLSX.utils.aoa_to_sheet(data)

    worksheet['!cols'] = [
        { wch: 15 },
        ...groups.map(() => ({ wch: 35 })),
    ]

    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: groups.length } },
    ]

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Расписание')

    const finalFileName = fileName || `расписание-${dateStr}.xlsx`
    XLSX.writeFile(workbook, finalFileName)
}


export function exportScheduleToExcelAdvanced({
    dateStr,
    groups,
    schedules,
    timeSlots = TIME_SLOTS,
    fileName,
}: ExportToExcelOptions): void {
    const workbook = XLSX.utils.book_new()
    const data: ExcelRow[] = []

    data.push(['Расписание занятий'])
    data.push([`Дата: ${formatScheduleDateFull(dateStr)}`])
    data.push([])

    data.push(['№', 'Время', ...groups.flatMap((g) => [g.name, ''])])

    timeSlots.forEach((slot) => {
        const row: ExcelRow = [slot.lessonNumber, slot.time]

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

    worksheet['!cols'] = [
        { wch: 4 },
        { wch: 15 },
        ...groups.flatMap(() => [
            { wch: 25 }, 
            { wch: 30 }, 
        ]),
    ]

    worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 2 + groups.length * 2 - 1 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 2 + groups.length * 2 - 1 } },
    ]

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Расписание')

    const finalFileName = fileName || `расписание-${dateStr}.xlsx`
    XLSX.writeFile(workbook, finalFileName)
}