'use client'

import { FiTrash2 } from "react-icons/fi"

interface TimeSlotCardProps {
    time: string
    lessonNumber: number
    discipline?: string
    teacher?: string
    audience?: string
    onAdd?: () => void
    onDelete?: () => void
}

export function TimeSlotCard({
    time,
    lessonNumber,
    discipline,
    teacher,
    audience,
    onAdd,
    onDelete
}: TimeSlotCardProps) {
    const hasSchedule = !!discipline

    return (
        <div className="flex gap-1 h-full">
            <div
                className="bg-white px-3 py-2 rounded-sm flex items-center justify-center font-semibold "
                style={{ minWidth: '150px' }}>
                {time}
            </div>

            <div className="w-full flex items-center h-full">
                {hasSchedule ? (
                    <div className="w-full bg-card p-2 rounded-sm h-full flex items-center justify-between">
                        <div className="">
                            <h3 className="font-bold text-lg text-gray-800 mb-1">
                                {discipline}
                            </h3>
                            <div className="flex flex-col text-sm text-gray-600">
                                {teacher && (
                                    <p>
                                        Преподаватель: <strong>{teacher}</strong>
                                    </p>
                                )}
                                {audience && (
                                    <p>
                                        Аудитория: <strong>{audience}</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onDelete}
                            className="p-1 hover:bg-red-100 self-start text-red-700 rounded-lg transition-colors">
                            <FiTrash2 className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onAdd}
                        className="w-full bg-white cursor-pointer h-full hover:bg-green-50 transition-colors italic py-2 rounded"
                    >
                        Добавить +
                    </button>
                )}
            </div>
        </div>
    )
}