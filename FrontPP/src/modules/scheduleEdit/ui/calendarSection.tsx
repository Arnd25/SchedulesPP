'use client'

import * as React from 'react'
import { FiChevronLeft, FiChevronRight, FiTrash2 } from 'react-icons/fi'
import { DayPicker } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import { Button } from '@base-ui/react'

interface Props {
    selectedDate: Date
    onDateChange: (date: Date) => void
    onGenerate: () => void
    onDeleteAll: () => void
    disabled: boolean
    isGenerating?: boolean
    hasSchedules?: boolean
}

export function CalendarSection({
    selectedDate,
    onDateChange,
    onGenerate,
    onDeleteAll,
    disabled,
    isGenerating = false,
    hasSchedules = false,
}: Props) {
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(selectedDate)

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() - 1)
        onDateChange(newDate)
    }

    const handleNextDay = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(newDate.getDate() + 1)
        onDateChange(newDate)
    }

    const handleToday = () => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        onDateChange(today)
    }

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            const newDate = new Date(date)
            newDate.setHours(0, 0, 0, 0)
            onDateChange(newDate)
        }
    }

    const customCSS = `
        .rdp {
            --rdp-cell-size: 36px;
            margin: 0;
        }
        .rdp-day_button {
            font-weight: 500;
            border-radius: max !important;
        }
        .rdp-selected .rdp-day_button {
            background-color: #005712 !important;
            color: white !important;
            font-weight: bold;
            border: none;
        }
        .rdp-today:not(.rdp-day_selected) .rdp-day_button {
            background-color: #c3e3d6;
            font-weight: bold;
            color: black;
        }
        .rdp-day:not(.rdp-selected):hover .rdp-day_button {
            background-color: #d1fae5;
        }
        .rdp-chevron {
            fill: black;
        }
    `

    return (
        <div className="w-full flex flex-col gap-2.5">
            {/* Календарь */}
            <div className="bg-white p-2 flex flex-col items-center rounded-lg">
                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={handlePrevDay}
                        className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                    >
                        <FiChevronLeft className="w-10 h-10 text-gray-700" />
                    </button>
                    <h2 className="text-md font-semibold capitalize whitespace-nowrap">
                        {formattedDate}
                    </h2>
                    <button
                        onClick={handleNextDay}
                        className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                    >
                        <FiChevronRight className="w-10 h-10 text-gray-700" />
                    </button>
                </div>
                <div>
                    <style>{customCSS}</style>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        locale={ru}
                        defaultMonth={selectedDate}
                        modifiers={{ today: new Date() }}
                    />
                </div>
            </div>

            <Button
                onClick={handleToday}
                className="bg-card w-full py-3 rounded-lg font-semibold"
            >
                Сегодня
            </Button>

            <Button
                onClick={onGenerate}
                disabled={disabled || isGenerating}
                className="w-full bg-primary disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                {isGenerating ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Генерация...
                    </>
                ) : (
                    'Сгенерировать'
                )}
            </Button>

            {hasSchedules && (
                <Button
                    onClick={onDeleteAll}
                    disabled={isGenerating}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <FiTrash2 className="w-5 h-5" />
                    Удалить всё на день
                </Button>
            )}
        </div>
    )
}