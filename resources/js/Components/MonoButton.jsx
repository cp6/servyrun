import React from "react";

export default function MonoButton({href, className = '', children, onClick, disabled}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`text-white dark:text-gray-900 bg-gray-700 border border-transparent hover:bg-gray-800 focus:ring-4 focus:ring-orange-300 disabled:hover:bg-grey-700 dark:bg-gray-200 dark:hover:bg-gray-300 dark:focus:ring-gray-900 dark:disabled:hover:bg-gray-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 font-medium focus:z-10 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2 text-center hover:cursor-pointer ${(disabled) ? "pointer-events-none cursor-progress" : ""}` + className}
        >
                 <span className="flex items-center rounded-md">
                     {children}
                 </span>
        </a>
    );
}
