'use client'

import * as React from 'react'
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { DayPicker } from 'react-day-picker'
import { ru } from 'date-fns/locale'
import { useClickOutside } from '../hooks/useClickOutside'
import 'react-day-picker/dist/style.css'

interface Props {
    currentDate: Date
    dayFormatted: string
    yearFormatted: number
    onDateSelect: (date: Date | undefined) => void
    onPrevDay: () => void
    onNextDay: () => void
}

export default function ScheduleDatePicker({
    currentDate,
    dayFormatted,
    yearFormatted,
    onDateSelect,
    onPrevDay,
    onNextDay,
}: Props) {
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)
    const calendarRef = React.useRef<HTMLDivElement>(null)

    useClickOutside(calendarRef, () => setIsCalendarOpen(false))

    const handleDateSelect = (date: Date | undefined) => {
        onDateSelect(date)
        if (date) {
            setIsCalendarOpen(false)
        }
    }

    return (
        <div className="bg-card rounded-lg px-6 py-6 flex items-center justify-between w-fit">
            <div className="flex items-center gap-10">
                <button
                    onClick={onPrevDay}
                    className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-white/50 rounded-lg">
                    <BiSolidLeftArrow className='w-6! h-6!' />
                </button>

                <div className="relative" ref={calendarRef}>
                    <button
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="flex items-center gap-3 text-black transition-colors font-semibold cursor-pointer">
                        <div>
                            <p className="text-2xl">{yearFormatted}</p>
                            <p className="text-lg capitalize">{dayFormatted}</p>
                        </div>
                    </button>

                    {isCalendarOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-2xl border border-black p-4 z-50">
                            <DayPicker
                                mode="single"
                                selected={currentDate}
                                onSelect={handleDateSelect}
                                locale={ru}
                                defaultMonth={currentDate}
                                modifiers={{ today: new Date() }}
                                modifiersStyles={{
                                    today: {
                                        fontWeight: 'bold',
                                        color: 'black',
                                    },
                                    
                                }}
                            />
                        </div>
                    )}
                </div>

                <button
                    onClick={onNextDay}
                    className="text-gray-700 hover:text-gray-900 transition-colors p-2 hover:bg-white/50 rounded-lg"
                >
                    <BiSolidRightArrow className='w-6! h-6!' />
                </button>
            </div>
        </div>
    )
}
