export interface TimeSlot {
    lessonNumber: number
    time: string
}
export interface Group {
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

export interface user {
    id: string
    firstName: string
    lastName: string
    avatar: string
    email: string
}
export interface Schedule {
    id: string
    pairId: string
    date: string
    lessonNumber: number
    createdAt: string
    updatedAt: string
    pair: Pair
}
export interface Teacher {
    id: string
    name: string
}

