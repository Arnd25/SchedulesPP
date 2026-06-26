"use client"
import { Button } from "@/components/ui/button";
import { Discipline, Teacher } from "../models";
import { AddTeacherButton } from "./TeacherAddButton";
import { SearchIcon } from "@/components/icons/searchIcon";
import { TeacherCard } from "./TeacherCard";
import { useState } from "react";

interface Props {
    teachers: Teacher[]
    disciplines: Discipline[]
}

export default function TeacherList({ teachers, disciplines }: Props) {
    const [search, setSearch] = useState('')
    
    const filteredTeachers = teachers?.filter((teacher) => {
        const query = search.toLowerCase()
        return (
            teacher.name.toLowerCase().includes(query) ||
            teacher.department.toLowerCase().includes(query)
        )
    }) || []

    const hasNoTeachers = !teachers || teachers.length === 0
    const hasNoResults = filteredTeachers.length === 0

    return (
        <div className="flex flex-col gap-2.5 h-full">
            <div className="bg-secondary  px-5 py-2.5 flex flex-col gap-1 rounded-[10px]">
                <div className="flex justify-between">
                    <p className="text-4xl font-medium">
                        Найти преподавателя
                    </p>
                    <AddTeacherButton disciplines={disciplines} />
                </div>
                {/* поиск */}
                <form className="flex gap-3.5 w-full items-end">
                    <div className="w-full">
                        <label className="text-gray-500 text-xl">
                            Найти преподавателя
                        </label>
                        <input
                            className="bg-white w-full rounded-md p-2.5 h-11"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="найти преподавателя..."
                            type="text"
                        />
                    </div>
                    <Button type="button" className="h-11 cursor-pointer flex items-center gap-2 text-2xl font-normal px-12">
                        Найти <SearchIcon />
                    </Button>
                </form>
            </div>


            {hasNoTeachers && (
                <div className="py-5 flex flex-col gap-1 bg-secondary rounded-l text-center">
                    <p className="text-2xl font-semibold">
                        Нет преподавателей
                    </p>
                    <p className="text-gray-600">
                        Добавьте первого преподавателя, нажав кнопку выше
                    </p>
                </div>
            )}

            {hasNoResults && !hasNoTeachers && (
                <div className="p-8 bg-secondary rounded-lg text-center">
                    <p className="text-2xl font-semibold text-gray-700 mb-2">
                        Ничего не найдено
                    </p>
                    <p className="text-gray-500">
                        Попробуйте изменить запрос
                    </p>
                </div>
            )}

            {!hasNoTeachers && !hasNoResults && (
                <ul className="p-2.5 bg-secondary grid grid-cols-4 h-full gap-1.25 rounded-lg">
                    {filteredTeachers.map((item) => (
                        <li key={item.id}>
                            <TeacherCard teacher={item} disciplines={disciplines} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}