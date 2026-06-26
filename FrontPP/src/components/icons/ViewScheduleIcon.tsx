import { SVGProps } from "react";

export function ViewScheduleIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <rect width="40" height="40" rx="10" fill="#005712" />
            <path 
                d="M28.5 10H11.5C10.6716 10 10 10.7462 10 11.6667V28.3333C10 29.2538 10.6716 30 11.5 30H28.5C29.3284 30 30 29.2538 30 28.3333V11.6667C30 10.7462 29.3284 10 28.5 10Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            <path 
                d="M10 14.4443H30M18 19.9999H26M18 24.4443H26M14 19.9999H15M14 24.4443H15" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
}