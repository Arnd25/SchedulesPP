import { SVGProps } from "react";

export function DisciplinesIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
                d="M28 30H14.5C13.5717 30 12.6815 29.6313 12.0251 28.9749C11.3687 28.3185 11 27.4283 11 26.5V13C11 12.2044 11.3161 11.4413 11.8787 10.8787C12.4413 10.3161 13.2044 10 14 10H28C28.2652 10 28.5196 10.1054 28.7071 10.2929C28.8946 10.4804 29 10.7348 29 11V29C29 29.2652 28.8946 29.5196 28.7071 29.7071C28.5196 29.8946 28.2652 30 28 30ZM27 28V25H14.5C14.1022 25 13.7206 25.158 13.4393 25.4393C13.158 25.7206 13 26.1022 13 26.5C13 26.8978 13.158 27.2794 13.4393 27.5607C13.7206 27.842 14.1022 28 14.5 28H27Z" 
                fill="white" 
            />
        </svg>
    );
}