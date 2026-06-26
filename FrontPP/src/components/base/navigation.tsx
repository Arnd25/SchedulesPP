"use client"
import React from 'react';
import {PUBLIC_MENU_ITEMS} from "@/data/menu-items";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();
    return (
        <nav className="" id="navigation">
            <menu className="flex items-center gap-x-4">
                {PUBLIC_MENU_ITEMS.map((item, key) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={key}>
                            <Link href={item.href}
                                  className={`font-medium transition-colors ${isActive ? "text-accent-foreground" : "text-muted-foreground hover:text-accent-foreground"}`}>{item.label}</Link>
                        </li>
                    );
                })}
            </menu>
        </nav>
    );
};

export default Navigation;