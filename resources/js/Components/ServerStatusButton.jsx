import {HiLightBulb, HiOutlineEmojiHappy, HiOutlineEmojiSad} from "react-icons/hi";
import React, {useState} from "react";
import axios from "axios";

export default function ServerStatusButton({resource}) {

    const [isUp, setIsUp] = useState(null);

    const handleClick = () => {
        axios.get(route('check-is-up', resource.id)).then(response => {
            setIsUp(response.data.is_up);
        }).catch(err => {
            setIsUp(!isUp);
        });
    };

    return (
        <>
            <button onClick={handleClick} type="button"
                    className={
                        (() => {
                            if (isUp) {
                                return (
                                    "inline-flex items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
                                )
                            } else if (isUp === null) {
                                return (
                                    "inline-flex items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center border-gray-200 bg-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                )
                            } else {
                                return (
                                    "inline-flex items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                )
                            }
                        })()
                    }>

                {
                    (() => {
                        if (isUp) {
                            return (
                                <>
                                    <HiOutlineEmojiHappy className="mr-2 h-5 w-5"/>
                                    <p>Server is up</p>
                                </>
                            )
                        } else if (isUp === null) {
                            return (
                                <>
                                    <HiLightBulb className="mr-2 h-5 w-5"/>
                                    <p>Check if up</p>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <HiOutlineEmojiSad className="mr-2 h-5 w-5"/>
                                    <p>Server is down</p>
                                </>
                            )
                        }
                    })()
                }
            </button>
        </>
    );
}
