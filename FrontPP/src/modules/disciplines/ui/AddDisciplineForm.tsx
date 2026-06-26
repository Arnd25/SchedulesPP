'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { createDiscipline } from '../actions/addDiscipline';
import { Notification } from '@/components/shared/notification';

export function AddDisciplineForm() {
    const [state, formAction, isPending] = useActionState(createDiscipline, null);

    return (
        <div className="bg-secondary px-5 py-2.5 flex flex-col gap-2.5 rounded-[10px]">
            <p className="text-4xl font-medium">Добавить дисциплину</p>
            <p className="text-gray-500 text-2xl">Добавить дисциплину</p>
            <form className="flex gap-3.5 w-full items-center" action={formAction}>
                <input 
                    name="discipline" 
                    className="bg-white w-full rounded-md p-2.5 h-11" 
                    placeholder="Введите название дисциплины..." 
                    type="text" 
                />
                <Button 
                    disabled={isPending} 
                    className="h-11 cursor-pointer flex items-center gap-2 text-2xl font-normal px-12"
                >
                    {isPending ? 'Добавление...' : 'Добавить'}
                </Button>
            </form>
            <Notification state={state} />
        </div>
    );
}