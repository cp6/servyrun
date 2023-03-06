import React from "react";

export default function ProgressBar({value}) {
    if (value !== null) {
        return (
            <div className="w-full mt-4">
                <div className="shadow w-full bg-gray-200 dark:bg-gray-500">
                    <div className={`bg-blue-500 text-sm leading-none py-1 text-center text-white rounded-sm`}
                         style={{width: value + '%'}}>{value}%
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-full my-9"></div>
        );
    }
}
