import React from "react";

export default function ResourceEmptyText({resource}) {
    return (
        <h2 className={'text-md my-1 font-semibold text-gray-600 md:text-lg dark:text-gray-300'}>No {resource} currently</h2>
    );
}
