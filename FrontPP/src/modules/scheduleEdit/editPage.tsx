'use client'

import { useMemo, useState, useEffect } from 'react'
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

function getStoredState(): StoredData | null {
    if (typeof window === 'undefined') return null

    try {
        const stored = localStorage.getItem('schedule_state')
        if (!stored) return null

        const data: StoredData = JSON.parse(stored)
        const age = Date.now() - data.timestamp

        if (age < STORAGE_TTL) {
            return data
        } else {
            localStorage.removeItem('schedule_state')
            return null
        }
    } catch {
        localStorage.removeItem('schedule_state')
        return null
    }
}

function getInitialDate(): Date {
    const stored = getStoredState()
    if (stored && stored.year && stored.month !== undefined && stored.day) {
        return new Date(stored.year, stored.month, stored.day)
    }
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function getInitialGroupId(): string | null {
    const stored = getStoredState()
    return stored?.groupId ?? null
}

export default function EditPage({ groups = [], schedules = [], pairs = [] }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate)
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(getInitialGroupId)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const data: StoredData = {
            groupId: selectedGroupId,
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth(),
            day: selectedDate.getDate(),
            timestamp: Date.now(),
        }

        localStorage.setItem('schedule_state', JSON.stringify(data))
    }, [selectedGroupId, selectedDate])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<{
        lessonNumber: number
        time: string
    } | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGroupSelect = (groupId: string) => {
        setSelectedGroupId(groupId)
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
            return
        }
        setSelectedSlot({ lessonNumber, time })
        setIsModalOpen(true)
    }

    const handleDeleteClick = async (scheduleId: string) => {
        if (!confirm('Вы уверены, что хотите удалить это расписание?')) return

        const result = await deleteScheduleAction(scheduleId)
        if (result.success) {
            window.location.reload()
        } else {
        }
    }

    const handlePairSelect = async (pairId: string) => {
        if (!selectedSlot) return
        setIsCreating(true)

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
            }
        } catch {
        } finally {
            setIsCreating(false)
        }
    }

    const handleGenerate = async () => {
        if (!selectedGroupId) {
            return
        }

        setIsGenerating(true)

        try {
            const result = await generateScheduleAction({
                groupId: selectedGroupId,
                date: currentDateStr,
            })

            if (result.success) {
                setTimeout(() => window.location.reload(), 1000)
            } else {
            }
        } catch {
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDeleteDay = async () => {
        if (!selectedGroupId) {
            return
        }

        if (!confirm('Удалить ВСЁ расписание на этот день?')) return

        setIsGenerating(true)

        try {
            const result = await deleteDayScheduleAction(selectedGroupId, currentDateStr)

            if (result.success) {
                setTimeout(() => window.location.reload(), 1000)
            } else {
            }
        } catch {
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
                key={`schedule-modal-${isModalOpen}`}
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