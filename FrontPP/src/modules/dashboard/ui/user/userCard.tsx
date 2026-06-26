"use client"
import React from 'react'
import { user } from '../../models'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface UserCardProps {
    data: user
}

export default function UserCard({ data }: UserCardProps) {
    if (!data) return null;

    return (
        <div className='flex gap-1.5 items-center'>
            <Avatar className='w-11 h-11'>
                <AvatarImage className='bg-white!' sizes='xl' src={data.avatar || process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER!}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER!
                    }}
                />
            </Avatar>
            <div className="flex flex-col">
                <div className="flex gap-1 text-xl">
                    <p>{data.firstName}</p>
                    <p>{data.lastName}</p>
                </div>
                <p className='text-lg text-gray-500'>{data.email}</p>
            </div>
        </div>
    )
}