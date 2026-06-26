
import { Button } from '@/components/ui/button';

import { ChevronDown, Search } from 'lucide-react';
import { API_ROUTES } from '@/shared/routes/api.route';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ProfileMenu } from './profileButton';
import { api } from '@/config/http/server.http';
import { User } from './models';



export const Header = async () => {
    const { data } = (await api.get<User>(API_ROUTES.USERS.ME()))
    if (!data) {
        return (
            <div className="">Нет данных</div>
        );
    }
    return (
        <header className="w-full max-w-full bg-card rounded-[10px] max-h-17 p-1.25 flex items-center justify-between">
            <form className='flex w-full gap-2.5' action="">
                <input className='bg-white w-full max-w-120 min-w-50 h-12 p-2.5 rounded-lg' placeholder='найти...' type="text" />
                <Button className='h-12 px-5'>Найти <Search /></Button>
            </form>
            <ProfileMenu user={data} />
        </header>
    );
}