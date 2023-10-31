import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import StatCard from "@/Components/StatCard";
import React from "react";
import YouAreNew from "@/Components/YouAreNew";
import DashboardActionsTable from "@/Components/DashboardActionsTable";

export default function Dashboard({auth}) {

    const user = usePage().props.auth.user;
    const counts = usePage().props.counts;
    const recentActions = usePage().props.RecentActions;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Hello {user.name}</h2>}
        >
            <Head title="Dashboard"/>
            {counts.servers > 0 ? (
                <>
                    <div className="mt-6 px-1 md:px-2 mx-auto max-w-7xl">
                        <div className='grid grid-cols-3 sm:grid-cols-8 gap-2 md:gap-3'>
                            {[
                                {text: 'Servers', value: counts.servers, route: route('server.index')},
                                {text: 'Connections', value: counts.connections, route: route('connection.index')},
                                {text: 'Keys', value: counts.keys, route: route('key.index')},
                                {text: 'IPs', value: counts.ips, route: route('ip.index')},
                                {text: 'DBs', value: counts.dbs, route: route('db.index')},
                                {text: 'Pings', value: counts.pings, route: route('ping.index')},
                                {text: 'Commands', value: counts.commands, route: route('command.index')},
                                {text: 'Outputs', value: counts.outputs, route: route('outputs.index')},
                            ].map((card, index) => (
                                <StatCard key={index} {...card} />
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="py-4 px-1 md:px-2 mx-auto max-w-7xl">
                            <div className="bg-white dark:bg-gray-700 overflow-hidden rounded-lg shadow-md">
                                <h2 className="px-4 pt-4 font-semibold text-lg text-gray-800 dark:text-white">Recent
                                    actions</h2>
                                {recentActions.length > 0 ? (
                                    <div>
                                        <p className="pl-4 pb-4 text-sm text-blue-500">
                                            <a href={route('log.index')}>View all</a>
                                        </p>
                                        <DashboardActionsTable data={recentActions}/>
                                    </div>
                                ) : (
                                    <p className="pl-4 pb-4 text-sm text-blue-500">No logs yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="mt-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <YouAreNew/>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
