import React from 'react';
import { cn } from "@/shared/lib/utils";

interface IContainerProps {
    className?: string;
    children?: React.ReactNode;
}


const Container = ({ className, children }: IContainerProps) => {
    return (
        <div className={cn(className, "max-w-[1440px] mx-auto px-1 md:px-5 ")}>
            {children}
        </div>
    );
};

export default Container;