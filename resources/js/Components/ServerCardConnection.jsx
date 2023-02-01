import React from "react";

export default function ServerCardConnection({connection = null}) {
    return (
        <dl>
            {
                (() => {
                    if (typeof (connection) != "undefined" && connection !== null) {
                        return (
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Connection</dt>);
                    } else {
                        return (
                            <dt className="mb-2 font-semibold leading-none text-yellow-500 dark:text-yellow-400">No connection set</dt>);
                    }
                })()
            }
            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">
                {
                    (() => {
                        if (typeof (connection) != "undefined" && connection !== null) {
                            if (typeof (connection.key_id) != "undefined" && connection.key_id !== null) {
                                return (
                                    connection.username + ":" + connection.ssh_port + " KEY"
                                );
                            } else if (typeof (connection.hashed_password) != "undefined" && connection.hashed_password !== null) {
                                return (
                                    connection.username + ":" + connection.ssh_port + " HASH PASSWORD"
                                );
                            } else if (connection.password !== 'undefined') {
                                return (
                                    connection.username + ":" + connection.ssh_port + " PASSWORD"
                                );
                            } else {
                                return ('')
                            }
                        }
                    })()
                }
            </dd>
        </dl>
    );
}
