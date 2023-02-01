import React, {useState} from "react";
import {Alert} from "flowbite-react";

export default function ResponseAlert({has_an_alert, alert_type, alert_message}) {

    const [hasAlert, setHasAlert] = useState(true);

    return (
        hasAlert && alert_message ? (
            <Alert color={alert_type} className='mb-3' onDismiss={function onDismiss() {
                setHasAlert(false)
            }}><span>{alert_message}</span></Alert>
        ) : <div className='py-8'></div>
    )

}
