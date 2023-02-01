import React from "react";
import {format} from "date-fns";

export default function Output({id, title, the_command, created_at, the_output, seconds, rows = 6}) {

    let created_at_date = new Date(created_at);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className='col-span-2'>
                <h2 className="mb-2 text-md text-gray-800 dark:text-white">{title}</h2>
            </div>
            <div className='col-span-1'>
                <h5 className="mb-1 text-sm text-gray-700 dark:text-gray-200">The command</h5>
            </div>
            <div className='col-span-2'>
                         <textarea rows={2} id={'command'}
                                   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   defaultValue={the_command}></textarea>
            </div>
            <div className='col-span-1 mt-3'>
                <h5 className="mb-1 text-sm text-gray-700 dark:text-gray-200">The output
                    {
                        (seconds != null) ?
                            <span className="text-gray-600 dark:text-gray-300">({seconds}s)</span> : null
                    }
                </h5>
            </div>
            <div className='col-span-1 text-end mt-3'>
                <label htmlFor={"output" + id}
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{format(created_at_date, "hh:mm:ssa do LLL yyyy")}</label>
            </div>
            <div className='col-span-2'>
                         <textarea id={"output" + id} rows={rows}
                                   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   defaultValue={the_output}></textarea>
            </div>
        </div>
    );
}
