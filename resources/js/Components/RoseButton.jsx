import React from "react";

export default function RoseButton({href, className = '', children, onClick, disabled}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700 border border-transparent focus:ring-4 focus:ring-rose-300 disabled:hover:bg-rose-700 dark:focus:ring-rose-900 dark:disabled:hover:bg-rose-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-sm focus:z-10 inline-flex items-center rounded-lg px-5 py-1.5 text-center hover:cursor-pointer ${(disabled) ? "pointer-events-none cursor-progress" : ""}` + className}
        >
                 <span className="flex items-center rounded-md">
                     {children}
                 </span>
        </a>
    );
}
