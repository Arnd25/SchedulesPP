export interface TimeSlot {
    lessonNumber: number
    time: string
}

export const TIME_SLOTS: readonly TimeSlot[] = [
    { lessonNumber: 1, time: '8:15-9:50' },
    { lessonNumber: 2, time: '10:00-11:35' },
    { lessonNumber: 3, time: '12:05-13:40' },
    { lessonNumber: 4, time: '13:50-15:25' },
    { lessonNumber: 5, time: '15:35-17:10' },
    { lessonNumber: 6, time: '17:15-18:50' },
    { lessonNumber: 7, time: '18:55-20:30' },
]