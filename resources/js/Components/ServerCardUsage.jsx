import React from "react";
import {HiRefresh} from "react-icons/hi";
import axios from "axios";

export default function ServerCardUsage({serverId, resource}) {

    const [cpu, setCpu] = React.useState(resource.cpu_usage ?? null);
    const [ram, setRam] = React.useState(resource.ram_used_percent ?? null);
    const [disk, setDisk] = React.useState(resource.disk_used_percent ?? null);
    const [diskAvailable, setDiskAvailable] = React.useState(resource.disk_available / 1000 / 1000 ?? null);

    const refreshUsage = () => {

        axios.get(route('server.usage', serverId)).then(response => {
            setCpu(new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 2}).format(response.data.cpu_used_percent));
            setRam(new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(response.data.ram_used_percent));
            setDisk(response.data.disk_used_percent);
            setDiskAvailable(response.data.disk_available_gb);
            console.log('Updated usage');
        }).catch(err => {
            console.log('Error fetching usage data');
        });

    };

    return (
        <dl className="flex items-center space-x-6 mt-4">
            <div>
                <dt className="mb-2 font-light leading-none text-gray-900 dark:text-gray-300"><HiRefresh
                    title={'Refresh usage stats'} onClick={refreshUsage} className='mt-2 h-5 w-5 hover:cursor-pointer'/>
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
                <dd className="mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white">{diskAvailable} GB</dd>
            </div>
        </dl>
    );
}
