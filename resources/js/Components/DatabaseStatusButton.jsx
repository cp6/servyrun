import {HiLightBulb} from "react-icons/hi";
import React, {useState} from "react";
import axios from "axios";

export default function DatabaseStatusButton({resource}) {

    const [isUp, setIsUp] = useState(null);

    const [title, setTitle] = useState('Check if can connect');

    const handleClick = () => {
        axios.get(route('db.connection.connect', resource.id)).then(response => {
            setIsUp(response.data.result);
        }).catch(err => {
            setIsUp(!isUp);
        });
    };

    return (
        <>
            <HiLightBulb
                className={
                    (() => {
                        if (isUp) {
                            return (
                                "md:ml-3 ml-2 h-6 w-6 text-green-500 dark:text-green-400 inline hover:cursor-pointer"
                            )
                        } else if (isUp === null) {
                            return (
                                "md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                            )
                        } else {
                            return (
                                "md:ml-3 ml-2 h-6 w-6 text-red-500 dark:text-red-400 inline hover:cursor-pointer"
                            )
                        }
                    })()
                }
                onClick={handleClick}
                title={title}/>
        </>
    );
}
