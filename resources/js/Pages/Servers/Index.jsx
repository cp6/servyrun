import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";
import {HiFolderOpen, HiLightningBolt, HiPencil, HiTrash, HiXCircle} from "react-icons/hi";
import ServerStatusButton from "@/Components/ServerStatusButton";
import {FaCircle} from "react-icons/all";
import ServerStatusDot from "@/Components/ServerStatusDot";

export default function Index({auth, servers, alert_type, alert_message}) {

    const [hasAlert, setHasAlert] = React.useState(true);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Servers</h2>}
        >
            <Head title="Servers"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('server.create')}>Add server</AddButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {servers.map(servers =>
                        <section key={servers.id} className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer" onClick={event => window.location.href =  route('server.show', servers.id)}>
                            <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                            <div className="flex items-center justify-between mb-2">
                                <div>            {servers.operating_system !== null ?
                                    <span
                                        className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{servers.operating_system}</span>
                                    : null
                                }
                                    <span
                                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{servers.type.name}</span></div>
                                <small className="text-end">
                                    <ServerStatusDot resource={servers}></ServerStatusDot>
                                </small>
                            </div>
                            <div className="flex flex-col items-center pb-3">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {servers.hostname}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{servers.title}</span>
                            </div>
                            </div></section>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
