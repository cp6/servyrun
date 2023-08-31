import React from "react";
import {HiRefresh} from "react-icons/hi";
import axios from "axios";
import {numberFormat} from "@/helpers";

export default function ServerCardUsage({serverId, usage, uptime}) {

    const [hideButton1, setHideButton1] = React.useState(false);
    const [hideButton2, setHideButton2] = React.useState(false);

    const [cpu, setCpu] = React.useState('-');
    const [ram, setRam] = React.useState('-');
    const [disk, setDisk] = React.useState('-');
    const [diskAvailable, setDiskAvailable] = React.useState('-');

    const [cpu1, setCpu1] = React.useState('-');
    const [cpu5, setCpu5] = React.useState('-');
    const [cpu15, setCpu15] = React.useState('-');
    const [users, setUsers] = React.useState('-');
    const [serverUptime, setServerUptime] = React.useState('-');

    const refreshUsage = () => {
        setHideButton1(true);
        axios.get(route('server.usage', serverId)).then(response => {
            setCpu(numberFormat(response.data.cpu_used_percent,3));
            setRam(numberFormat(response.data.ram_used_percent,3));
            setDisk(response.data.disk_used_percent);
            setDiskAvailable(numberFormat(response.data.disk_available_gb,3) + ' GB');
            setHideButton1(false);
        }).catch(err => {
            setHideButton1(false);
        });
    };

    const refreshUptime = () => {
        setHideButton2(true);
        axios.get(route('server.uptime', serverId)).then(response => {
            setCpu1(response.data.last_minute);
            setCpu5(response.data.last_5_minutes);
            setCpu15(response.data.last_15_minutes);
            setUsers(response.data.users);
            setServerUptime(response.data.uptime);
            setHideButton2(false);
        }).catch(err => {
            setHideButton2(false);
        });
    };

    return (
        <div className={'grid md:grid-cols-2 grid-cols-1'}>
            <div className={'md:col-span-2'}>
                <dl className="flex items-center space-x-6 mt-4">
                    <div>
                        <dt className={(hideButton1) ? "mb-2 font-light leading-none text-white/50 dark:text-gray-900" : "mb-2 font-light leading-none text-gray-900 dark:text-gray-300 hover:dark:text-gray-200"}>
                            <HiRefresh
                                title={'Refresh usage stats'} onClick={refreshUsage}
                                className={(hideButton1) ? "mt-2 h-5 w-5 text-white/50 dark:text-gray-700" : "mt-2 h-5 w-5 hover:cursor-pointer"}/>
                        </dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white"></dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">CPU %</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{cpu}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">RAM %</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{ram}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Disk %</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{disk}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Disk Avail</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{diskAvailable}</dd>
                    </div>
                </dl>
            </div>
            <div className={'md:col-span-2'}>
                <dl className="flex items-center space-x-6 mt-4">
                    <div>
                        <dt className={(hideButton2) ? "mb-2 font-light leading-none text-white/50 dark:text-gray-900" : "mb-2 font-light leading-none text-gray-900 dark:text-gray-300 hover:dark:text-gray-200"}>
                            <HiRefresh
                                title={'Refresh usage stats'} onClick={refreshUptime}
                                className={(hideButton2) ? "mt-2 h-5 w-5 text-white/50 dark:text-gray-700" : "mt-2 h-5 w-5 hover:cursor-pointer"}/>
                        </dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white"></dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Load 1m</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{cpu1}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Load 5m</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{cpu5}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Load 15m</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{cpu15}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Users</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{users}</dd>
                    </div>
                    <div>
                        <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300">Uptime</dt>
                        <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{serverUptime}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
