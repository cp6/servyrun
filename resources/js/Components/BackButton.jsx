import {HiOutlineArrowLeft} from "react-icons/hi";
import React from "react";

export default function BackButton({href, className = '', children, onClick}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={"text-white bg-blue-700 border border-transparent hover:bg-blue-800 py-0.5 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center text-sm focus:z-10 rounded-lg" + className}
        >
                 <span className="flex items-center rounded-md px-2 py-1">
            <HiOutlineArrowLeft className="mr-2 h-5 w-5"/>
                     {children}
                 </span>
        </a>
    );
}
