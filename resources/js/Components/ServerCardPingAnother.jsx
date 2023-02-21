import React from "react";
import axios from "axios";
import {Dropdown} from "flowbite-react";

export default function ServerCardPingAnother({serverId, servers}) {

    const [dropDownDisabled, setDropDownDisabled] = React.useState(false);

    const [pingResult, setPingResult] = React.useState(null);

    const [label, setLabel] = React.useState("Ping another server");

    const doPingFromTo = event => {
        setDropDownDisabled(true);
        setLabel("Pinging.....");
        axios.get(route('run.ping-from-to', [serverId, event.target.id])).then(response => {
            console.log('Ran ping');
            setPingResult("AVG: " + response.data.avg + " MIN: " + response.data.min + " MAX: " + response.data.max);
            setDropDownDisabled(false);
            setLabel("Ping another server");
        }).catch(err => {
            console.log('Error running ping');
            setDropDownDisabled(false);
            setLabel("Ping another server");
        });
    };

    return (
        <div className={'grid md:grid-cols-2 grid-cols-1 mt-2'}>
            <div className={'md:col-span-1 md:col-span-2'}>
                <Dropdown
                    label={label}
                    dismissOnClick={false}
                    disabled={dropDownDisabled}
                    className={'dark:bg-gray-500'}
                    size={'sm'}
                >
                    {servers.map(server =>
                        <Dropdown.Item key={server.id} className={(dropDownDisabled) ? 'hidden' : null}>
                            <a onClick={doPingFromTo} id={server.id}>{server.hostname} ({server.title})</a>
                        </Dropdown.Item>)}
                </Dropdown>
            </div>
            <div className={'md:col-span-1 md:col-span-2'}>
                <p className={'text-gray-600 dark:text-white'}>{pingResult}</p>
            </div>
        </div>
    );
}
