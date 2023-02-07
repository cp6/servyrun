import React from "react";

export default function EmeraldButton({href, className = '', children, onClick}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={"text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 border border-transparent focus:ring-4 focus:ring-emerald-300 disabled:hover:bg-emerald-700 dark:focus:ring-emerald-900 dark:disabled:hover:bg-emerald-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-sm focus:z-10 inline-flex items-center rounded-lg px-5 py-2 text-center" + className}
        >
                 <span className="flex items-center rounded-md">
                     {children}
                 </span>
        </a>
    );
}
