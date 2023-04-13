import React from "react";

export default function ResourceEmptyText({resource, className}) {
    return (
        <h2 className={'text-md p-2 font-semibold leading-none text-yellow-500 md:text-lg dark:text-yellow-400 ' + className}>No {resource} currently</h2>
    );
}
