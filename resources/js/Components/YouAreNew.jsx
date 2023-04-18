import React from "react";
import AddButton from "@/Components/AddButton";

export default function YouAreNew({}) {
    return (
            <div className="py-5">
                <h1 className="block text-4xl font-bold text-gray-800 dark:text-white" tabIndex="0" role="link">Welcome to surcuri</h1>
                <p className="text-sm text-gray-700 dark:text-gray-200 my-2">It seems yous installation was a success!</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 my-2">If you come across any errors or issues please submit them to the Github.</p>
                <div className="flex flex-wrap gap-2 my-4">
                    <AddButton href={route('server.create')}>Add a server</AddButton>
                </div>
            </div>
    );
}
