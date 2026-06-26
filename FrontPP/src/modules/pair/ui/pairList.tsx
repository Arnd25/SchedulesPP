"use client"
import { PairCard } from './pairCard';
import { Pair } from '../models';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchIcon } from '@/components/icons/searchIcon';

interface Props {
    pairs: Pair[] | undefined
}

function PairList({ pairs }: Props) {
    const [search, setSearch] = useState('')
    const filteredPairs = pairs?.filter((pair) => {
        const query = search.toLowerCase()
        return (pair.discipline.name.toLowerCase().includes(query) ||
            pair.teacher.name.toLocaleLowerCase().includes(query) ||
            pair.group.name.toLocaleLowerCase().includes(query) ||
            pair.audience.toLocaleLowerCase().includes(query)
        )
    }) || []

    return (
        <div className="">
            <div className="flex flex-col gap-2.5">
                <div className="bg-secondary px-5 py-2.5 flex flex-col gap-2.5 rounded-[10px]">
                    <p className="text-4xl font-medium">Найти группу</p>
                    <form className="flex gap-3.5 w-full items-end" action="">
                        <div className="">
                            <label className=" text-gray-500 text-xl">Найти группу</label>
                            <input onChange={(e) => setSearch(e.target.value)}
                                className="bg-white w-full rounded-md p-2.5 h-11"
                                placeholder="найти дисциплину..."
                                type="text" />
                        </div>
                        <Button type='button' className="h-11 cursor-pointer flex items-center gap-2 text-2xl font-normal px-12">Найти <SearchIcon /> </Button>
                    </form>
                </div>
                <ul className=" p-2.5 bg-secondary flex gap-1.25 rounded-lg flex-wrap">
                    {filteredPairs.length === 0 ? (
                        <div className="p-8 text-center text-gray-800">
                            {search ? 'Ничего не найдено' : 'Нет доступных пар'}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-1.5">
                            {filteredPairs.map((item) => (
                                <PairCard data={item} key={item.id} />
                            ))}
                        </div>
                    )}
                </ul>
            </div>
        </div>

    )
}
export default PairList
