"use client"
import { Input } from "@/components/ui/input";
import { User } from "../models"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserCard from "./UserCard";

interface Props {
    users: User[]
}
export default function UserList({ users }: Props) {
    const [search, setSearch] = useState('')
    const filteredUsers = users?.filter((user) => {
        const query = search.toLowerCase()
        return (user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLocaleLowerCase().includes(query) ||
            user.email.toLocaleLowerCase().includes(query) ||
            user.role.toLocaleLowerCase().includes(query)
        )
    }) || []
    return (
        <div className="flex flex-col gap-2.5">
            <div className="px-3.75 bg-secondary py-2.5 rounded-lg">
                <p className='text-4xl text-white'>Пользователи</p>
                <form className='flex gap-3.5 items-center h-fit' action="">
                    <Input onChange={(e) => setSearch(e.target.value)}
                        className='bg-white border-0! ring-0! min-h-full' />
                    <Button className='text-xl px-6 py-5'>Найти</Button>
                </form>
            </div>
            <ul className='bg-secondary rounded-lg p-2.5'>
                {filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-gray-800">
                        {search ? 'Ничего не найдено' : 'Нет доступных пользователей'}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-1.5">
                        {filteredUsers.map((item) => (
                            <UserCard user={item} key={item.id} />
                        ))}
                    </div>
                )}
            </ul>
        </div>
    )
}
