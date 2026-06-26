import { api } from '@/config/http/server.http'
import { API_ROUTES } from '@/shared/routes/api.route'
import React from 'react'
import UserCard from './userCard'
import { APP_ROUTES } from '@/shared/routes/app.route'
import Link from 'next/link'
import { User } from '@/modules/users/models'


export const UsersList = async () => {
    const { data } = await api.get(API_ROUTES.USERS.ALL())

    if (!data || !Array.isArray(data)) {
        return <div className="px-6 py-6 bg-secondary rounded-lg flex flex-col gap-2.5 h-full overflow-hidden">
            <h2 className="text-xl font-semibold">Пользователи</h2>
            <p className="text-muted-foreground">Нет данных</p>
        </div>
    }

    return (
        <div className="px-6 py-6 bg-secondary rounded-lg flex flex-col gap-2.5 h-full overflow-hidden">
            <h2 className="text-xl font-semibold">Пользователи</h2>
            <div className="overflow-hidden">
                <ul className="flex flex-col gap-2.5 overflow-y-auto h-full sidebar-scroll">
                    {data.map((item: User) => (
                        <li key={item.id} className="p-2 bg-card flex gap-2.5 items-center rounded-lg text-xl font-semibold shrink-0">
                            <UserCard data={item} />
                        </li>
                    ))}
                </ul>
            </div>

            <Link
                className="w-full flex bg-primary rounded-lg py-2.5 text-white text-xl justify-center shrink-0"
                href={APP_ROUTES.users()}
            >
                Подробнее
            </Link>
        </div>
    )
}