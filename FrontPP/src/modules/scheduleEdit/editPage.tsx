'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { GroupCards } from './ui/groupCard'
import { CalendarSection } from './ui/calendarSection'
import { ScheduleList } from './ui/scheduleList'
import { AddScheduleModal } from './ui/AddScheduleModal'
import { Group, Schedule, Pair } from './models'
import { TIME_SLOTS } from './constants/TimeSlot'
import {
    createScheduleAction,
    deleteScheduleAction,
    generateScheduleAction,
    deleteDayScheduleAction,
} from './actions/schedule.actions'

const STORAGE_TTL = 3600000

interface Props {
    groups: Group[]
    schedules: Schedule[]
    pairs: Pair[]
}

interface StoredData {
    groupId: string | null
    year: number
    month: number
    day: number
    timestamp: number
}

export default function EditPage({ groups = [], schedules = [], pairs = [] }: Props) {
    const [isMounted, setIsMounted] = useState(false)
    const calendarRef = useRef<HTMLDivElement>(null)

    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    })

    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)

    useEffect(() => {
        setIsMounted(true)

        const stored = localStorage.getItem('schedule_state')

        if (stored) {
            try {
                const data: StoredData = JSON.parse(stored)
                const now = Date.now()
                const age = now - data.timestamp

                if (age < STORAGE_TTL) {
                    if (data.groupId) {
                        setSelectedGroupId(data.groupId)
                    }

                    if (data.year && data.month !== undefined && data.day) {
                        setSelectedDate(new Date(data.year, data.month, data.day))
                    }
                } else {
                    localStorage.removeItem('schedule_state')
                }
            } catch (e) {
                localStorage.removeItem('schedule_state')
            }
        }
    }, [])

    useEffect(() => {
        if (!isMounted) return

        const data: StoredData = {
            groupId: selectedGroupId,
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth(),
            day: selectedDate.getDate(),
            timestamp: Date.now(),
        }

        localStorage.setItem('schedule_state', JSON.stringify(data))
    }, [selectedGroupId, selectedDate, isMounted])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<{
        lessonNumber: number
        time: string
    } | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleGroupSelect = (groupId: string) => {
        setSelectedGroupId(groupId)
        setError(null)
        setSuccessMessage(null)
    }

    const handleTodayClick = () => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        setSelectedDate(today)

        setTimeout(() => {
            if (calendarRef.current) {
                const todayElement = calendarRef.current.querySelector('[data-today="true"]')

                if (todayElement) {
                    todayElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                    })

                    todayElement.classList.add('ring-4', 'ring-blue-500', 'rounded-full')
                    setTimeout(() => {
                        todayElement.classList.remove('ring-4', 'ring-blue-500', 'rounded-full')
                    }, 2000)
                }
            }
        }, 100)
    }

    const handleDateChange = (date: Date) => {
        setSelectedDate(date)
    }

    const currentDateStr = useMemo(() => {
        const year = selectedDate.getFullYear()
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
        const day = String(selectedDate.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }, [selectedDate])

    const daySchedules = useMemo(() => {
        if (!selectedGroupId) return []
        return (schedules ?? []).filter(s => {
            const scheduleDate = s.date.split('T')[0]
            return s.groupId === selectedGroupId && scheduleDate === currentDateStr
        })
    }, [schedules, selectedGroupId, currentDateStr])

    const scheduleItems = TIME_SLOTS.map(slot => {
        const schedule = daySchedules.find(s => s.lessonNumber === slot.lessonNumber)
        return {
            time: slot.time,
            discipline: schedule?.pair.discipline.name,
            teacher: schedule?.pair.teacher.name,
            audience: schedule?.pair.audience,
            scheduleId: schedule?.id,
        }
    })

    const groupPairs = useMemo(() => {
        if (!selectedGroupId) return []
        return pairs.filter(p => p.groupId === selectedGroupId)
    }, [pairs, selectedGroupId])

    const handleAddClick = (lessonNumber: number, time: string) => {
        if (!selectedGroupId) {
            setError('Сначала выберите группу')
            return
        }
        setSelectedSlot({ lessonNumber, time })
        setError(null)
        setIsModalOpen(true)
    }

    const handleDeleteClick = async (scheduleId: string) => {
        if (!confirm('Вы уверены, что хотите удалить это расписание?')) return

        const result = await deleteScheduleAction(scheduleId)
        if (result.success) {
            window.location.reload()
        } else {
            setError(result.error || 'Ошибка при удалении')
        }
    }

    const handlePairSelect = async (pairId: string) => {
        if (!selectedSlot) return
        setIsCreating(true)
        setError(null)

        try {
            const result = await createScheduleAction({
                pairId,
                date: currentDateStr,
                lessonNumber: selectedSlot.lessonNumber,
            })

            if (result.success) {
                setIsModalOpen(false)
                setSelectedSlot(null)
                window.location.reload()
            } else {
                setError(result.error || 'Ошибка при создании')
            }
        } catch (err: any) {
            setError('Ошибка при создании расписания')
        } finally {
            setIsCreating(false)
        }
    }

    const handleGenerate = async () => {
        if (!selectedGroupId) {
            setError('Сначала выберите группу')
            return
        }

        setIsGenerating(true)
        setError(null)
        setSuccessMessage(null)

        try {
            const result = await generateScheduleAction({
                groupId: selectedGroupId,
                date: currentDateStr,
            })

            if (result.success) {
                setSuccessMessage(`✅ ${result.message || `Создано ${result.count} пар`}`)
                setTimeout(() => window.location.reload(), 1000)
            } else {
                setError(result.error || 'Ошибка при генерации')
            }
        } catch (err: any) {
            setError('Ошибка при генерации расписания')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDeleteDay = async () => {
        if (!selectedGroupId) {
            setError('Сначала выберите группу')
            return
        }

        if (!confirm('Удалить ВСЁ расписание на этот день?')) return

        setIsGenerating(true)
        setError(null)

        try {
            const result = await deleteDayScheduleAction(selectedGroupId, currentDateStr)

            if (result.success) {
                setSuccessMessage(`✅ ${result.message || `Удалено ${result.count} пар`}`)
                setTimeout(() => window.location.reload(), 1000)
            } else {
                setError(result.error || 'Ошибка при удалении')
            }
        } catch (err: any) {
            setError('Ошибка при удалении расписания дня')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="flex flex-col gap-2.5">
            <GroupCards
                groups={groups}
                selectedGroupId={selectedGroupId}
                onGroupSelect={handleGroupSelect}
            />

            <div className="flex bg-secondary p-2.5 gap-6 rounded-lg">
                <div className='w-90 max-w-90 min-w-90'>
                    <CalendarSection
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        onGenerate={handleGenerate}
                        onDeleteAll={handleDeleteDay}
                        disabled={!selectedGroupId || isGenerating}
                        isGenerating={isGenerating}
                        hasSchedules={daySchedules.length > 0}
                    />
                </div>

                <div className='w-full'>
                    <ScheduleList
                        items={scheduleItems}
                        onAdd={handleAddClick}
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>

            <AddScheduleModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedSlot(null)
                }}
                pairs={groupPairs}
                lessonNumber={selectedSlot?.lessonNumber ?? 0}
                time={selectedSlot?.time ?? ''}
                onSelect={handlePairSelect}
                isLoading={isCreating}
            />
        </div>
    )
}