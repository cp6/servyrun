import React from "react";

export default function ServerLast3Commands({commands}) {
    return (
        <dl>
            <dd className="mb-2 font-light text-gray-600 sm:mb-5 dark:text-gray-300">
                {commands.map(c => (
                    <code key={c.id} className={'text-red-500 dark:text-red-400'}>
                        <p className={'mt-2'}>
                            <a href={route('outputs.show', c.id)}>{c.the_command}</a>
                        </p>
                    </code>
                ))}
            </dd>
        </dl>
    );
}
