import React from "react";
import FlexAddButtonDiv from "@/Components/FlexAddButtonDiv";

export default function YouAreNew({}) {
    return (
            <div className="py-5">
                <h1 className="block text-4xl font-bold text-gray-800 dark:text-white" tabIndex="0" role="link">Welcome to surcuri</h1>
                <p className="text-sm text-gray-700 dark:text-gray-200 my-2">It seems your installation was a success!</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 my-2">If you come across any errors or issues please submit them to the Github.</p>
                <FlexAddButtonDiv href={route('server.create')} resource={'a server'}/>
            </div>
    );
}
