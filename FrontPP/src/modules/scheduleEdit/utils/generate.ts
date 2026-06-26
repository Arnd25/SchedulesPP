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

