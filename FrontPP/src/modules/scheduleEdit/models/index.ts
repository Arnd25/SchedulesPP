export enum Department {
    FINANCE = 'Финансы',
    AUTOMATION = 'Автоматизация',
    TRANSPORT = 'Транспорт',
    LAND_MANAGEMENT = 'Землеустройство',
}

export const DEPARTMENTS = Object.values(Department)

export const DEPARTMENT_LABELS: Record<Department, string> = {
    [Department.FINANCE]: 'Финансы',
    [Department.AUTOMATION]: 'Автоматизация',
    [Department.TRANSPORT]: 'Транспорт',
    [Department.LAND_MANAGEMENT]: 'Землеустройство',
}

export interface Group {
    id: string
    name: string
    department: Department
}

export interface Teacher {
    id: string
    name: string
}

export interface Discipline {
    id: string
    name: string
}

export interface Pair {
    id: string
    teacherId: string
    disciplineId: string
    audience: string
    hours: number
    groupId: string
    remaingHours: number
    createdAt: string
    updatedAt: string
    teacher: Teacher
    discipline: Discipline
    group: Group
}

export interface Schedule {
    id: string
    pairId: string
    date: string
    groupId: string
    lessonNumber: number
    createdAt: string
    updatedAt: string
    pair: Pair
}