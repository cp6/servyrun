import React from "react";

export default function ServerCardSpecs({resource}) {
    return (
        <dl className="flex items-center space-x-6 mt-2">
            <div>
                <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">CPU</dt>
                <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{resource.cpu_cores ?? '-'}</dd>
            </div>
            <div>
                <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Ghz</dt>
                <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{resource.cpu_freq ?? '-'}</dd>
            </div>
            <div>
                {
                    (() => {
                        if (resource.disk_tb !== null) {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Disk TB</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(resource.disk_tb)}</dd>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Disk GB</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{(resource.disk_gb === null) ? '-' : new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(resource.disk_gb)}</dd>
                                </>
                            )
                        }
                    })()
                }
            </div>
            <div>
                {
                    (() => {
                        if (resource.ram_gb !== null) {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">RAM GB</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(resource.ram_gb)}</dd>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">RAM MB</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{(resource.ram_mb === null) ? '-' : new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(resource.ram_mb)}</dd>
                                </>
                            )
                        }
                    })()
                }
            </div>
            <div>
                {
                    (() => {
                        if (resource.price !== null && resource.currency !== null) {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Price {resource.currency}</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{resource.price}</dd>
                                </>
                            )
                        }
                    })()
                }
            </div>
        </dl>
    );
}
