'use client'

import { Group, DEPARTMENTS } from '../models'
import { parseGroupName } from '../utils/groupParser'

interface Props {
    groups: Group[]
    selectedGroupId: string | null
    onGroupSelect: (groupId: string) => void
}

export function GroupCards({ groups = [], selectedGroupId, onGroupSelect }: Props) {
    const groupsByDepartment = DEPARTMENTS.reduce((acc, dept) => {
        acc[dept] = (groups ?? []).filter(g => g?.department === dept)
        return acc
    }, {} as Record<string, Group[]>)

    return (
        <div className="grid bg-secondary p-2.5 rounded-lg grid-cols-4 gap-2.5">
            {DEPARTMENTS.map(department => {
                const departmentGroups = groupsByDepartment[department]

                return (
                    <div key={department} className="bg-card flex flex-col gap-2.5 rounded-sm p-4">
                        <h3 className="text-center text-black font-semibold text-xl">
                            {department}
                        </h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {departmentGroups && departmentGroups.length > 0 ? (
                                departmentGroups.map((group) => {
                                    const isSelected = selectedGroupId === group.id
                                    const { prefix, number } = parseGroupName(group.name)

                                    return (
                                        <button
                                            key={group.id}
                                            onClick={() => onGroupSelect(group.id)}
                                            className={
                                                `flex flex-col items-center justify-center cursor-pointer py-2.5 px-4 rounded-sm ${isSelected
                                                    ? 'bg-primary text-white'
                                                    : 'bg-secondary text-gray-800 hover:bg-secondary'
                                                }`}>
                                            <p className="text-xl uppercase">
                                                {prefix}
                                            </p>

                                            {number && (
                                                <p className="text-md ">
                                                    {number}
                                                </p>
                                            )}
                                        </button>
                                    )
                                })
                            ) : (
                                <p className="text-lg text-gray-500 text-center">
                                    Нет групп
                                </p>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}