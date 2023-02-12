import React from "react";

export default function ServerCardConnection({connection = null}) {
    return (
        <>
            {
                (() => {
                    if (typeof (connection) != "undefined" && connection !== null) {
                        return (
                            <p className="mb-2 leading-none text-gray-900 dark:text-gray-100 inline">Connection is </p>);
                    } else {
                        return (
                            <p className="mb-2 font-semibold leading-none text-yellow-500 dark:text-yellow-400 inline">No
                                connection set</p>);
                    }
                })()
            }
            <p className="mb-4 text-gray-500 sm:mb-5 dark:text-gray-100 inline">
                {
                    (() => {
                        if (typeof (connection) != "undefined" && connection !== null) {
                            if (typeof (connection.key_id) != "undefined" && connection.key_id !== null) {
                                return (
                                    connection.username + ":" + connection.ssh_port + " with key"
                                );
                            } else if (connection.password !== 'undefined') {
                                return (
                                    connection.username + ":" + connection.ssh_port + " with password"
                                );
                            } else {
                                return ('')
                            }
                        }
                    })()
                }
            </p>
        </>
    );
}
