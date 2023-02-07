import React from "react";

export default function OrangeButton({href, className = '', children, onClick}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={"text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600 border border-transparent focus:ring-4 focus:ring-orange-300 disabled:hover:bg-orange-700 dark:focus:ring-orange-900 dark:disabled:hover:bg-orange-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-sm focus:z-10 inline-flex items-center rounded-lg px-5 py-2 text-center" + className}
        >
                 <span className="flex items-center rounded-md">
                     {children}
                 </span>
        </a>
    );
}
