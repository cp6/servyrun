import {Button} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import React from "react";

export default function YouAreNew({}) {
    return (
            <div className="py-5">
                <h1 className="block text-4xl font-bold text-gray-800 dark:text-white" tabIndex="0" role="link">Welcome to surcuri</h1>
                <p className="text-sm text-gray-700 dark:text-gray-200 my-2">It seems yous installation was a success!</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 my-2">If you come across any errors or issues please submit them to the Github.</p>
                <div className="flex flex-wrap gap-2 my-4">
                    <Button color={'info'} size="xs" href={route('server.create')}>
                        <HiPlus className="mr-2 h-5 w-5"/>
                        Add server
                    </Button>
                </div>
            </div>
    );
}
