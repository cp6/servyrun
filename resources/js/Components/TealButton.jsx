import React from "react";

export default function TealButton({href, className = '', children, onClick, disabled}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`text-white bg-teal-500 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-700 border border-transparent focus:ring-4 focus:ring-teal-300 disabled:hover:bg-teal-700 dark:focus:ring-teal-900 dark:disabled:hover:bg-teal-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-sm focus:z-10 inline-flex items-center rounded-lg px-5 py-1.5 text-center hover:cursor-pointer ${(disabled) ? "pointer-events-none cursor-progress" : ""}` + className}
        >
                 <span className="flex items-center rounded-md">
                     {children}
                 </span>
        </a>
    );
}
