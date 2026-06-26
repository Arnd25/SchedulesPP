import { api } from '@/config/http/server.http';
import { API_ROUTES } from '@/shared/routes/api.route';
import React from 'react'
import {UsersList} from './user/usersList';
import Link from 'next/link';
import { APP_ROUTES } from '@/shared/routes/app.route';
import DashboardContent from './schedule/scheduleContent';
import { Group, Schedule } from '../models';

export async function DashboardPage() {
    const [teachersResult, groupsResult, disciplinesResult] = await Promise.all([
        api.get(API_ROUTES.teacher.COUNT()),
        api.get(API_ROUTES.group.COUNT()),
        api.get(API_ROUTES.disciplines.COUNT()),
    ]);
    const group = await api.get(API_ROUTES.group.ALL());
    const schedulesResult = await api.get(API_ROUTES.schedules.ALL());

    return (
        <div className='flex flex-col gap-2.5 h-full p-2.5 overflow-hidden'>
            <div className="grid grid-cols-3 gap-2.5 shrink-0">
                <Link href={APP_ROUTES.group()} className="py-8 flex flex-col justify-center items-center gap-2.5 bg-[linear-gradient(to_bottom,#327440_0%,#327440_40%,#4BBA62_100%)] rounded-lg">
                    <p className='text-3xl text-white'>Группы</p>
                    <p className='text-6xl text-card'>{groupsResult.data as string}</p>
                </Link>
                <Link href={APP_ROUTES.teachers()} className="py-8 flex flex-col justify-center items-center gap-2.5 bg-[linear-gradient(to_bottom,#327440_0%,#327440_40%,#4BBA62_100%)] rounded-lg">
                    <p className='text-3xl text-white'>Преподавателей</p>
                    <p className='text-6xl text-card'>{teachersResult.data as string}</p>
                </Link>
                <Link href={APP_ROUTES.discipline()} className="py-8 flex flex-col justify-center items-center gap-2.5 bg-[linear-gradient(to_bottom,#327440_0%,#327440_40%,#4BBA62_100%)] rounded-lg">
                    <p className='text-3xl text-white'>Дисциплин</p>
                    <p className='text-6xl text-card'>{disciplinesResult.data as string}</p>
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
                <div className="col-span-2 bg-secondary rounded-lg w-full h-full flex flex-col overflow-hidden">
                    <DashboardContent
                        groups={group.data as Group[]}
                        schedules={schedulesResult.data as Schedule[]}
                    />
                </div>
                <UsersList />
            </div>
        </div>
    )
}