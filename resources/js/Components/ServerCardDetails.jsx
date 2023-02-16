import React from "react";
import {HiClipboardCopy, HiKey, HiStar} from "react-icons/hi";

export default function ServerCardDetails({resource}) {
    return (
        <>
            <h2 className="mt-4 mb-2 text-2xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.hostname}</h2>
            <p className="mb-4 text-lg font-semibold leading-none text-gray-900 md:text-lg dark:text-white">{(resource.location !== null )? resource.location.name : ''}</p>
            <dl>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">
                    {resource.ips.map(ip => (
                        <p key={ip.id}>
                            <HiClipboardCopy className="mr-2 mb-1 h-5 w-5 inline hover:cursor-grab" onClick={() => {
                                navigator.clipboard.writeText(ip.ip)
                            }} title={'Copy IP'}/>
                            <a href={route('ip.show', ip.id)}>{ip.ip}</a>
                            {(ip.is_main) ?
                                <HiStar className="ml-2 mb-1 h-5 w-5 inline text-yellow-500" title={'Main ip'}/> : null}
                            {(ip.is_ssh) ? <HiKey className="ml-2 mb-1 h-5 w-5 inline text-green-500"
                                                            title={'SSH ip'}/> : null}
                        </p>
                    ))}
                </dd>
            </dl>
        </>
    );
}
