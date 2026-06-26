'use client';

import { useActionState, useState } from 'react';
import { Button } from "@/components/ui/button";
import { createPair } from '../actions/CreatePair';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combox"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Discipline, Group, Teacher } from '../models';
import { Input } from '@/components/ui/input';
import { Notification } from '@/components/shared/notification';

interface Date {
    disciplines: Discipline[];
    teacher: Teacher[];
    group: Group[];
}

export function AddGroupForm({ disciplines, teacher, group }: Date) {
    const [state, formAction, isPending] = useActionState(createPair, null);
    const [selectedTab, setSelectedTab] = useState("ПЕРВАЯ");
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
    const [selectedTeacher, setSelectedTeacher] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<string>("");


    return (
        <div className="bg-secondary h-full px-5 py-2.5 flex flex-col gap-2.5 rounded-[10px]">
            <p className="text-3xl font-medium">Добавить дисциплину</p>
            <form className="flex gap-3.5 h-full justify-between flex-col w-full" action={formAction}>
                <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1 max-w-full">
                        <label className="text-sm font-medium">Дисциплина</label>
                        <div className="w-full max-w-full">
                            <Combobox
                                items={disciplines}
                                value={selectedDiscipline}
                                onValueChange={(value) => setSelectedDiscipline(value ?? "")}
                            >
                                <ComboboxInput
                                    placeholder="Выберите дисциплину"
                                    className="w-full bg-white"
                                />
                                <ComboboxContent align="start" className="w-full">
                                    <ComboboxEmpty>Дисциплина не найдена</ComboboxEmpty>
                                    <ComboboxList className="max-w-full">
                                        {(item) => (
                                            <ComboboxItem
                                                key={item.id}
                                                value={item.id}
                                                className="max-w-full"
                                            >
                                                <div className="truncate w-full" title={item.name}>
                                                    {item.name}
                                                </div>
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 max-w-full">
                        <label className="text-sm font-medium">Преподаватель</label>
                        <div className="w-full max-w-full">
                            <Combobox
                                items={teacher}
                                value={selectedTeacher}
                                onValueChange={(value) => setSelectedTeacher(value ?? "")}
                            >
                                <ComboboxInput
                                    placeholder="Выберите преподавателя"
                                    className="w-full bg-white"
                                />
                                <ComboboxContent align="start" className="w-full">
                                    <ComboboxEmpty>Препод не найден</ComboboxEmpty>
                                    <ComboboxList className="max-w-full">
                                        {(item) => (
                                            <ComboboxItem
                                                key={item.id}
                                                value={item.id}
                                                className="max-w-full"
                                            >
                                                <div className="truncate w-full" title={item.name}>
                                                    {item.name}
                                                </div>
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 max-w-full">
                        <label className="text-sm font-medium">Группа</label>
                        <div className="w-full max-w-full">
                            <Combobox
                                items={group}
                                value={selectedGroup}
                                onValueChange={(value) => setSelectedGroup(value ?? "")}
                            >
                                <ComboboxInput
                                    placeholder="Выберите группу"
                                    className="w-full bg-white"
                                />
                                <ComboboxContent align="start" className="w-full">
                                    <ComboboxEmpty>Препод не найден</ComboboxEmpty>
                                    <ComboboxList className="max-w-full">
                                        {(item) => (
                                            <ComboboxItem
                                                key={item.id}
                                                value={item.id}
                                                className="max-w-full"
                                            >
                                                <div className="truncate w-full" title={item.name}>
                                                    {item.name}
                                                </div>
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className='text-sm font-medium'>Аудитория</label>
                        <Input name='audience' id="audience" className='bg-white' placeholder='Аудитория' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className='text-sm font-medium'>Кол-во часов</label>
                        <Input name='hours' id="hours" className='bg-white' placeholder='Кол-во часов' type="number" />
                    </div>



                    <input type="hidden" name='Shift' value={selectedTab} />
                    <input type="hidden" name='DisciplineId' value={selectedDiscipline} />
                    <input type="hidden" name='TeacherId' value={selectedTeacher} />
                    <input type="hidden" name='groupId' value={selectedGroup} />

                </div>
                <div className="grid grid-cols-2 gap-2.5">
                    <Button type="submit" disabled={isPending} className="h-11 cursor-pointer gap-2 text-xl font-normal">
                        {isPending ? "Добавление..." : "Добавить"}
                    </Button>
                    <Button type="reset" disabled={isPending} className="h-11 cursor-pointer gap-2 text-xl font-medium hover:bg-card bg-card text-foreground">
                        Очистить
                    </Button>
                </div>
            </form>
            <Notification state={state}/>
        </div>
    );
}