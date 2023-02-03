import React from "react";

export default function ServerCardDetails({resource}) {
    return (
        <>
            <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.hostname}</h2>
            <p className="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.location.name}</p>
            <dl>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">
                    {resource.ips.map(ip => (
                        <p key={ip.id}>
                            {ip.ip}
                        </p>
                    ))}
                </dd>
            </dl>
        </>
    );
}
