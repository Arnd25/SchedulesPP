'use client';

import { useActionState, useState } from 'react';
import { Button } from "@/components/ui/button";
import { createGroup } from '../actions/addGroup';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Notification } from '@/components/shared/notification';
export function AddGroupForm() {
    const [state, formAction, isPending] = useActionState(createGroup, null);
    const [selectedTab, setSelectedTab] = useState("ПЕРВАЯ")
    const [selectedDepartment, setSelectedDepartment] = useState("")


    return (
        <div className="bg-secondary h-full px-5 py-2.5 flex flex-col gap-2.5 rounded-[10px]">
            <p className="text-3xl font-medium">Добавить группу</p>
            <form className="flex gap-3.5 h-full justify-between flex-col w-full" action={formAction}>
                <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Название группы</label>
                        <input
                            name="group"
                            className="bg-white w-full rounded-md p-2.5 h-10!"
                            placeholder="Название группы..."
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Кафедра</label>
                        <Select onValueChange={setSelectedDepartment}>
                            <SelectTrigger className="bg-white w-full h-10!">
                                <SelectValue placeholder="Кафедра..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Финансы">Финансы</SelectItem>
                                <SelectItem value="Автоматизация">Автоматизация</SelectItem>
                                <SelectItem value="Транспорт">Транспорт</SelectItem>
                                <SelectItem value="Землеустройство">Землеустройство</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className='text-sm font-medium'>Смена</label>
                        <Tabs onValueChange={setSelectedTab} defaultValue="ПЕРВАЯ" className="">
                            <TabsList className="bg-white rounded-full flex gap-1.5 ">
                                <TabsTrigger
                                    value="ПЕРВАЯ"
                                    className="rounded-full data-[state=active]:bg-primary cursor-pointer transition-all duration-300 data-[state=active]:text-white w-10! h-10!"
                                >
                                    1
                                </TabsTrigger>
                                <TabsTrigger
                                    value="ВТОРАЯ"
                                    className="rounded-full data-[state=active]:bg-primary cursor-pointer transition-all duration-300 data-[state=active]:text-white w-10! h-10!"
                                >
                                    2
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <input type="hidden" name='Shift' value={selectedTab} />
                    <input type="hidden" name='Department' value={selectedDepartment} />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                    <Button disabled={isPending} className="h-11 cursor-pointer gap-2 text-xl font-normal">Добавить </Button>
                    <Button disabled={isPending} type='reset' className="h-11 cursor-pointer gap-2 text-xl font-medium hover:bg-card bg-card text-foreground">Очистить </Button>
                </div>
            </form>
            <Notification state={state} duration={4000} />
        </div>
    );
}