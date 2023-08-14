import React from "react";

export default function ServerCardConnection({connection = null}) {
    return (
        <>
            <dl className="space-x-6 mt-4">
                <div>
                    <dd className="">
                        {
                            (() => {
                                if (typeof (connection) != "undefined" && connection !== null) {
                                    return (
                                        <p className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300 inline">Connection </p>);
                                } else {
                                    return (
                                        <p className="mb-2 font-semibold leading-none text-yellow-500 dark:text-yellow-400 inline">No
                                            connection set, create a connection to fetch more information. </p>);
                                }
                            })()
                        }
                        <p className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white inline">
                            {
                                (() => {
                                    if (typeof (connection) != "undefined" && connection !== null) {
                                        if (typeof (connection.key_id) != "undefined" && connection.key_id !== null) {
                                            return (
                                                connection.username + ":" + connection.ssh_port + " with key"
                                            );
                                        } else if (connection.password !== 'undefined') {
                                            return (
                                                connection.username + ":" + connection.ssh_port + " with a password"
                                            );
                                        } else {
                                            return ('')
                                        }
                                    }
                                })()
                            }
                        </p>
                    </dd>
                </div>
            </dl>
        </>
    );
}
