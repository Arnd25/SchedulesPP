'use client' // 1. Обязательно добавляем эту директиву для использования хуков

import React, { SVGProps } from 'react';
import { MENU_DATA } from "@/data/menu.data";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";

interface INavMenuProps {
    className?: string;
}



const NavMenu = ({ className}: INavMenuProps) => {
    const pathname = usePathname();

    return (
        <div className={cn(className, 'w-full')}>
            <nav className="w-full px-2.5">
                <menu className="flex flex-col gap-2.5 ">
                    {MENU_DATA.map((item, index) => {
                        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                        const Icon = item.icon;
                        return (
                            <li key={index}
                                className="">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "py-3.75 px-2.5 rounded-[15px] flex whitespace-nowrap gap-2 hover:bg-card/40 text-[20px]",
                                        isActive
                                            ? " bg-card!"
                                            : ""
                                    )}
                                >
                                    <Icon className='w-9! h-9!'/>{item.label}
                                </Link>
                            </li>
                        );
                    })}
                </menu>
            </nav>
        </div>
    );
};

export default NavMenu;