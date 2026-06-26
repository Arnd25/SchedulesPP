'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { logout } from './actions/actions';
import { useState } from 'react';
import { User } from './models';
import { ProfileEditForm } from './ui/UpdateProfileForm';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ProfileMenuProps {
    user: User;
}

export const ProfileMenu = ({ user }: ProfileMenuProps) => {
    const [open, setOpen] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleProfileEdit = () => {
        setOpen(false);
        setShowEditForm(true);
    };

    // Проверяем, есть ли валидный avatar URL
    const hasValidAvatar = user.avatar && !imageError;
    const avatarSrc = hasValidAvatar ? user.avatar : process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER!
    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild className="group">
                    <Button className='px-1 py-1 cursor-pointer relative rounded-full bg-secondary border-none! ring-0! flex h-full'>
                        <div className="relative w-11 h-11 rounded-full overflow-hidden">
                            <Avatar className='w-full h-full'>
                                <AvatarImage src={user.avatar || process.env.NEXT_PUBLIC_IMAGE_PLACEHOLDER} />
                            </Avatar>
                        </div>
                        <div className="flex text-foreground gap-1.5">
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                        </div>
                        <ChevronDown className={`text-foreground w-7! h-8! transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="focus:bg-card focus:text-black cursor-pointer"
                        onClick={handleProfileEdit}>
                        Настройки
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="focus:bg-card focus:text-black cursor-pointer"
                        onClick={logout}>
                        Выйти
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ProfileEditForm
                isOpen={showEditForm}
                onClose={() => setShowEditForm(false)}
                user={user}
            />
        </>
    );
};