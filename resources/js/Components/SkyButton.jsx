import React from "react";

export default function SkyButton({href, className = '', children, onClick}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={"text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700 border border-transparent focus:ring-4 focus:ring-sky-300 disabled:hover:bg-sky-700 dark:focus:ring-sky-900 dark:disabled:hover:bg-sky-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-sm focus:z-10 inline-flex items-center rounded-lg px-5 py-2 text-center" + className}
        >
                 <span class="flex items-center rounded-md">
                     {children}
                 </span>
        </a>
    );
}
