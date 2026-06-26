'use client'

import * as React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { Schedule, Group } from '../../models'
import Link from 'next/link'
import { APP_ROUTES } from '@/shared/routes/app.route'

interface Props {
    groups: Group[]
    schedules?: Schedule[]
}

export default function ScheduleContent({ groups, schedules = [] }: Props) {
    const [selectedGroup, setSelectedGroup] = React.useState<Group | null>(null)
    const [query, setQuery] = React.useState('')

    const currentDate = new Date().toISOString().split('T')[0]

    const filteredGroups =
        query === ''
            ? groups
            : groups.filter((group) =>
                group.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const daySchedules = selectedGroup
        ? schedules.filter((schedule) => {
            const scheduleDate = schedule.date.split('T')[0]
            return schedule.pair.groupId === selectedGroup.id && scheduleDate === currentDate
        })
        : []

    const scheduleCards = Array.from({ length: 7 }, (_, index) => {
        const lessonNumber = index + 1
        const schedule = daySchedules.find(s => s.lessonNumber === lessonNumber)
        return {
            lessonNumber,
            schedule: schedule || null
        }
    })

    const handleSelect = (group: Group | null) => {
        setSelectedGroup(group)
        setQuery(group?.name ?? '')
    }

    return (
        <div className="flex flex-col h-full gap-2.5 p-4">
            <div className="flex justify-between items-center ">
                <h2 className="text-3xl font-semibold text-black">
                    Расписание на сегодня
                </h2>
                <Link href={APP_ROUTES.view()} className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Все расписание
                </Link>
            </div>

            <div className="">
                <p className="text-gray-700 mb-2 text-sm">Выберете группу</p>
                <Combobox value={selectedGroup} onChange={handleSelect}>
                    <div className="relative">
                        <div className="relative w-full cursor-default overflow-hidden bg-white rounded-lg border border-gray-300 focus:outline-none">
                            <ComboboxInput
                                className="w-full border-none py-2.5 pl-3 pr-10 text-sm text-gray-900 focus:ring-0"
                                displayValue={(group: Group | null) => group?.name ?? ''}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="группа..."
                            />
                            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </ComboboxButton>
                        </div>

                        <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredGroups.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Ничего не найдено
                                </div>
                            ) : (
                                filteredGroups.map((group) => (
                                    <ComboboxOption
                                        key={group.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-200 text-black' : 'text-gray-900'}`
                                        }
                                        value={group}
                                    >
                                        {({ selected }) => (
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {group.name}
                                            </span>
                                        )}
                                    </ComboboxOption>
                                ))
                            )}
                        </ComboboxOptions>
                    </div>
                </Combobox>
            </div>

            <div className=" overflow-y-auto min-h-0 sidebar-scroll">
                <div className="flex flex-col gap-2 pb-2">
                    {scheduleCards.map(({ lessonNumber, schedule }) => (
                        <div
                            key={lessonNumber}
                            className={schedule
                                ? "bg-card rounded-lg p-4"
                                : "bg-white rounded-lg p-4 text-center text-gray-500"}>
                            {schedule ? (
                                <div className='flex flex-col gap-1'>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-2xl">
                                            {schedule.pair.discipline.name}
                                        </h3>
                                    </div>
                                    <p className="text-md text-gray-600 flex gap-1">
                                        Преподаватель:
                                        <strong className='capitalize text-gray-800'>
                                            {schedule.pair.teacher.name}
                                        </strong>
                                    </p>
                                    <p className="text-md text-gray-600 flex gap-1">
                                        Аудитория:
                                        <strong className='capitalize text-gray-800'>
                                            {schedule.pair.audience}
                                        </strong>
                                    </p>
                                </div>
                            ) : (
                                <p>Занятий нет</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}