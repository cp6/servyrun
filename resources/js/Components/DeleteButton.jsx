import {HiTrash} from "react-icons/hi";
import React from "react";

export default function DeleteButton({className = '', disabled, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className={"text-white bg-red-600 border border-transparent hover:bg-red-700 focus:ring-4 focus:ring-red-300 disabled:hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:disabled:hover:bg-red-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center" + className}
            disabled={disabled}
        >
            <HiTrash className="mr-2 h-5 w-5"/>
            {children}
        </button>
    );
}
