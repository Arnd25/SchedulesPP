"use client"
import { SearchIcon } from "@/components/icons/searchIcon";
import { Button } from "@/components/ui/button";
import { api } from "@/config/http/server.http";
import { API_ROUTES } from "@/shared/routes/api.route";

import { AddDisciplineForm } from "./ui/AddDisciplineForm";
import DisciplineCard from "./ui/disciplineCard";
import { Discipline } from "./models/disciplines";
import { useState } from "react";

interface Props {
    disciplines: Discipline[]
}

const Disciplines = ({ disciplines: data }: Props) => {
    const [search, setSearch] = useState('')
    const filteredDisciplines = data?.filter((discipline) => {
        const query = search.toLowerCase()
        return discipline.name.toLowerCase().includes(query)
    }) || []
    return (
        <div className="w-full col-span-1 sticky flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-secondary px-5 py-2.5 flex flex-col gap-2.5 rounded-[10px]">
                    <p className="text-4xl font-medium">Найти дисциплину</p>
                    <p className=" text-gray-500 text-2xl">Найти дисциплину</p>
                    <form className="flex gap-3.5 w-full items-center" action="">
                        <input className="bg-white w-full rounded-md p-2.5 h-11"
                            placeholder="найти дисциплину..."
                            onChange={(e) => setSearch(e.target.value)}
                            type="text" />
                        <Button className="h-11 cursor-pointer flex items-center gap-2 text-2xl font-normal px-12">Найти <SearchIcon /> </Button>
                    </form>
                </div>
                <AddDisciplineForm />
            </div>
            <ul className="flex p-2.5 bg-secondary gap-1.25 rounded-lg flex-wrap">
                {filteredDisciplines.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        {search ? 'Ничего не найдено' : 'Нет доступных пар'}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2.5">
                        {filteredDisciplines.map((item) => (
                            <DisciplineCard key={item.id} data={item} />
                        ))}
                    </div>
                )}
            </ul>
        </div>
    );
};

export default Disciplines;