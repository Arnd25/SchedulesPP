'use client'

import { Group, Schedule } from '../models'
import { useScheduleDate } from '../hooks/useScheduleDate'
import { useGroupPagination } from '../hooks/useGroupPagination'
import { formatDateToISO, getDaySchedules } from '../utils/schedule.utils'
import { exportScheduleToExcel } from '../utils/exel'
import ScheduleDatePicker from './ScheduleDatePicker'
import GroupPagination from './GroupPagination'
import ScheduleGrid from './ScheduleGrid'
import { Button } from '@/components/ui/button'
import { BiSolidFileExport } from 'react-icons/bi'

interface Props {
    groups?: Group[] | null
    schedules?: Schedule[] | null
}

export default function ScheduleTable({
    groups = [],
    schedules = [],
}: Props) {
    const {
        currentDate,
        dayFormatted,
        yearFormatted,
        handleDateSelect,
        goToPrevDay,
        goToNextDay,
    } = useScheduleDate()

    const {
        currentPage,
        totalPages,
        currentGroups,
        setCurrentPage,
        goToPrevPage,
        goToNextPage,
    } = useGroupPagination(groups!)

    const currentDateStr = formatDateToISO(currentDate)
    const daySchedules = getDaySchedules(schedules, currentDateStr)

    const handleExport = () => {
        exportScheduleToExcel({
            dateStr: currentDateStr,
            groups: groups!,
            schedules: daySchedules,
        })
    }

    const handleExportCurrentPage = () => {
        exportScheduleToExcel({
            dateStr: currentDateStr,
            groups: currentGroups,
            schedules: daySchedules,
            fileName: `расписание-${currentDateStr}-страница-${currentPage}.xlsx`,
        })
    }

    return (
        <div className="h-full flex flex-col gap-5">
            <div className="flex bg-secondary p-2.5 rounded-lg justify-between">
                <ScheduleDatePicker
                    currentDate={currentDate}
                    dayFormatted={dayFormatted}
                    yearFormatted={yearFormatted}
                    onDateSelect={handleDateSelect}
                    onPrevDay={goToPrevDay}
                    onNextDay={goToNextDay}
                />
                <div className="flex gap-2">
                    <Button
                        onClick={handleExport}
                        className="text-white px-6 py-5 self-end text-lg rounded-lg gap-2.5 font-medium transition-colors flex items-center bg-primary cursor-pointer">
                        Экспорт
                        <BiSolidFileExport />
                    </Button>

                </div>
            </div>
            <div className="flex flex-col bg-secondary px-2.5 py-2.5 rounded-lg">
                <Button
                    onClick={handleExportCurrentPage}
                    className="text-white px-6 py-5 self-end bg-primary text-lg cursor-pointer">
                    Экспортировать {currentPage} страницу
                    <BiSolidFileExport />
                </Button>
                <GroupPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={goToPrevPage}
                    onNextPage={goToNextPage}
                    onPageSelect={setCurrentPage}
                />
                <ScheduleGrid groups={currentGroups} daySchedules={daySchedules} />
            </div>
        </div>
    )
}