import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";
import ServerStatusDot from "@/Components/ServerStatusDot";

export default function Index() {

    const alert = usePage().props.alert;
    const auth = usePage().props.auth;
    const servers = usePage().props.servers;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Servers</h2>}
        >
            <Head title="Servers"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('server.create')}>Add a server</AddButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {servers.map(server =>
                        <section key={server.id}
                                 className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                 onClick={event => window.location.href = route('server.show', server.id)}>
                            <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div>            {server.operating_system !== null ?
                                        <span
                                            className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{server.operating_system}</span>
                                        : null
                                    }
                                        <span
                                            className="bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{server.type.name}</span>
                                        {
                                            (() => {
                                                if (server.conn === null) {
                                                    return (<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">No connection</span>)
                                                }
                                            })()
                                        }
                                    </div>
                                    <small className="text-end">
                                        <ServerStatusDot resource={server}></ServerStatusDot>
                                    </small>
                                </div>
                                <div className="flex flex-col items-center pb-3">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        {server.hostname}
                                    </h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{server.title}</span>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
