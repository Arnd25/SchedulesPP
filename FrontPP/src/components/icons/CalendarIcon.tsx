import { SVGProps } from "react";

export function CalendarIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
            <mask 
                id="mask0_477_719" 
                style={{ maskType: "luminance" }} 
                maskUnits="userSpaceOnUse" 
                x="9" 
                y="10" 
                width="22" 
                height="20"
            >
                <path 
                    d="M29 13.5H11C10.4477 13.5 10 13.9477 10 14.5V27.5C10 28.0523 10.4477 28.5 11 28.5H29C29.5523 28.5 30 28.0523 30 27.5V14.5C30 13.9477 29.5523 13.5 29 13.5Z" 
                    fill="white" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
                <path 
                    d="M15 11.5V15.5" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                />
                <path 
                    d="M20.5 20H15M25 24H15" 
                    stroke="black" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                />
                <path 
                    d="M25 11.5V15.5" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                />
            </mask>
            <g mask="url(#mask0_477_719)">
                <path 
                    d="M8 8.5H32V32.5H8V8.5Z" 
                    fill="white"
                />
            </g>
        </svg>
    );
}