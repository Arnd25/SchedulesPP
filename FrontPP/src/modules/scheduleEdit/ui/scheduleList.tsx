'use client'

import { TimeSlotCard } from './timeSlotCard'
import { TIME_SLOTS } from '../constants/TimeSlot'

interface ScheduleItem {
    time: string
    discipline?: string
    teacher?: string
    audience?: string
    scheduleId?: string
}

interface Props {
    items: ScheduleItem[]
    onAdd: (lessonNumber: number, time: string) => void
    onDelete: (scheduleId: string) => void
}

export function ScheduleList({ items, onAdd, onDelete }: Props) {
    return (
        <div className="grid gap-1.5 w-full h-full">
            {TIME_SLOTS.map((slot) => {
                const item = items.find(i => i.time === slot.time)

                return (
                    <TimeSlotCard
                        key={slot.lessonNumber}
                        time={slot.time}
                        lessonNumber={slot.lessonNumber}
                        discipline={item?.discipline}
                        teacher={item?.teacher}
                        audience={item?.audience}
                        onAdd={() => onAdd(slot.lessonNumber, slot.time)}
                        onDelete={() => item?.scheduleId && onDelete(item.scheduleId)}
                    />
                )
            })}
        </div>
    )
}