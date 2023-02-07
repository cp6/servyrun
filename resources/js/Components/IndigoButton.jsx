import React from "react";

export default function IndigoButton({href, className = '', children, onClick}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={"text-white bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 border border-transparent focus:ring-4 focus:ring-indigo-300 disabled:hover:bg-indigo-700 dark:focus:ring-indigo-900 dark:disabled:hover:bg-indigo-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-sm focus:z-10 inline-flex items-center rounded-lg px-5 py-2 text-center" + className}
        >
                 <span class="flex items-center rounded-md">
                     {children}
                 </span>
        </a>
    );
}
