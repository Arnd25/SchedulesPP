"use client"
import NavMenu from './nav-menu'
import { LogoIcon } from '@/components/icons/logoIcon'
import { Button } from '@/components/ui/button';
import { LogoutIcon } from '@/components/icons/LogoutIcon';
import { logout } from './actions/action';

export const Sidebar = () => {


    return (
        <div className='sticky top-0 h-screen shadow-[1px_0_4px_rgba(0,0,0,0.25)] flex flex-col gap-2.5 overflow-y-scroll sidebar-scroll sidebar-scroll::-webkit-scrollbar'>
            <div className="relative p-2.5">
                <div className="absolute bottom-0 left-0 right-0 h-px"

                />
                <div className="flex items-center gap-2">
                    <LogoIcon />
                    <p className='uppercase text-[20px] text-primary font-semibold whitespace-nowrap leading-tight'>
                        Волгоградский <br /> технический колледж
                    </p>
                </div>
            </div>
            <NavMenu />
            <div className="p-2.5">
                <p className='text-2xl ml-5 font-medium'>Действия с аккаунтом</p>
                <Button variant={'link'} onClick={logout} className=' w-full justify-start hover:bg-card/60 hover:no-underline text-xl h-16 font-normal text-black'>
                    <LogoutIcon className='h-8! w-8!' /> Выйти
                </Button>
            </div>
        </div>
    )
}