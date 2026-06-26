import React from 'react'
import { Discipline } from '../models/disciplines'
import { DeleteDiscipline } from '../actions/DeleteDisciplines'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'

interface discipline {
    data: Discipline
}

function DisciplineCard({ data }: discipline) {
    return (
        <div className='bg-card flex rounded-lg p-2.5 gap-2.5 items-center'>
            {data.name}
            <form action={DeleteDiscipline} >
                <input type="hidden" name="id" value={data.id} />
                <Button className='bg-transparent! p-0 text-2xl text-primary cursor-pointer hover:text-primary/80'
                    type="submit"
                >
                    <XIcon />
                </Button>
            </form >
        </div>
    )
}

export default DisciplineCard
