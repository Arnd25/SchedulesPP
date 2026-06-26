import * as React from 'react'

export function useScheduleDate(initialDate = new Date()) {
    const [currentDate, setCurrentDate] = React.useState(initialDate)

    const dayFormatted = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
    }).format(currentDate)

    const yearFormatted = currentDate.getFullYear()

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setCurrentDate(date)
        }
    }

    const goToPrevDay = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() - 1)
        setCurrentDate(newDate)
    }

    const goToNextDay = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() + 1)
        setCurrentDate(newDate)
    }

    return {
        currentDate,
        dayFormatted,
        yearFormatted,
        handleDateSelect,
        goToPrevDay,
        goToNextDay,
    }
}
