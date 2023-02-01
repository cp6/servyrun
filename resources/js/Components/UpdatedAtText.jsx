import React from "react";
import {format} from "date-fns";

export default function UpdatedAtText({updated_at, string_format = 'hh:mma do LLL yyyy'}) {

    let formatted_updated_at_date = format(new Date(updated_at), string_format);

    return (
        <p className="my-4 text-md leading-none text-gray-900 dark:text-white"><span
            className='font-light'>Updated:</span> {formatted_updated_at_date}</p>
    );
}
