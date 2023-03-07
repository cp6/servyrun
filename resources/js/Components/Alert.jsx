import React, {useState} from "react";
import {Alert} from "flowbite-react";

export default function ResponseAlert({details = null}) {

    const [hasAlert, setHasAlert] = useState(details !== null);

    if (hasAlert) {
        return (
            <Alert color={details.type} className='mb-3 shadow-sm' onDismiss={function onDismiss() {
                setHasAlert(false)
            }}><span>{details.message}</span></Alert>
        );
    } else {
        return (<div className='py-8'></div>);
    }

}
