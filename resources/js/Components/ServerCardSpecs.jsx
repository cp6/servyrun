import React from "react";
import {numberFormat} from "@/helpers";

export default function ServerCardSpecs({resource}) {
    return (
        <dl className="flex items-center space-x-6 mt-2">
            <div>
                <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">CPU</dt>
                <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white text-center">{resource.cpu_cores ?? '-'}</dd>
            </div>
            <div>
                <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Ghz</dt>
                <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white text-center">{numberFormat(resource.cpu_freq,3) ?? '-'}</dd>
            </div>
            <div>
                {
                    (() => {
                        if (resource.disk_tb !== null) {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Disk TB</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white text-center">{numberFormat(resource.disk_tb,3)}</dd>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Disk GB</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white text-center">{(resource.disk_gb === null) ? '-' : numberFormat(resource.disk_gb,3)}</dd>
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
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white text-center">{numberFormat(resource.ram_gb,3)}</dd>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">RAM MB</dt>
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white text-center">{(resource.ram_mb === null) ? '-' : numberFormat(resource.ram_mb,3)}</dd>
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
                                    <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white text-center">{resource.price}</dd>
                                </>
                            )
                        }
                    })()
                }
            </div>
        </dl>
    );
}
