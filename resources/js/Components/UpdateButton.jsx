import {HiRefresh} from "react-icons/hi";
import React from "react";

export default function UpdateButton({type = 'submit', className = '', processing, children, onClick}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={"text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 mt-6 uppercase font-semibold tracking-widest focus:ring-4 focus:ring-purple-300 disabled:hover:bg-purple-800 border border-transparent dark:focus:ring-purple-900 dark:disabled:hover:bg-purple-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 focus:z-10 inline-flex items-center focus:outline-none rounded-md text-xs px-5 py-2 text-center" + className}
            disabled={processing}
        >
            <HiRefresh className="mr-2 h-5 w-5"/>
            {children}
        </button>
    );
}
