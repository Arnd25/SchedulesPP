"use client"
import React, { useState } from 'react'
import { User } from '../models'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { IoMdSettings } from "react-icons/io"
import UserDeleteForm from './DeleteForm'
import { UserEditForm } from './UserForm'

interface data {
    user: User
}

function UserCard({ user }: data) {
    const [showFormEdit, setShowFormEdit] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    return (
        <div className='bg-card rounded-lg p-2 pr-9! flex gap-2.5 items-center relative'>
            <Avatar size='lg'>
                <AvatarImage className='w-10! h-10!' src={user.avatar || process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER} />
            </Avatar>
            <div className="flex flex-col">
                <div className="flex gap-1 text-xl">
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                </div>
                <p className='text-lg text-gray-500'>{user.email}</p>
            </div>

            <UserDeleteForm
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                userId={user.id}
                userFirstName={user.firstName}
                userLastName={user.lastName}
            />
            <UserEditForm
                isOpen={showFormEdit}
                onClose={() => setShowFormEdit(false)}
                user={user}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild className="top-0">
                    <Button
                        className='px-1 py-1 cursor-pointer absolute top-0 right-0 rounded-full bg-transparent! text-primary hover:text-primary/80 border-none! ring-0!'
                        aria-label="Меню пользователя"
                    >
                        <IoMdSettings className='w-6! h-6!' />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowFormEdit(true)}>
                        Изменить
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setShowDeleteConfirm(true)}
                        className="text-red-600 focus:text-red-600"
                    >
                        Удалить
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserCard