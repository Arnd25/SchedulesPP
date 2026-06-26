import { SVGProps } from "react";

export function LogoutIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            className={className}
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="34" height="34" rx="10" fill="#005712" />
            <path d="M10 26C9.45 26 8.97933 25.8043 8.588 25.413C8.19667 25.0217 8.00067 24.5507 8 24V10C8 9.45 8.196 8.97933 8.588 8.588C8.98 8.19667 9.45067 8.00067 10 8H17V10H10V24H17V26H10ZM21 22L19.625 20.55L22.175 18H14V16H22.175L19.625 13.45L21 12L26 17L21 22Z" fill="white" />
        </svg>

    );
}