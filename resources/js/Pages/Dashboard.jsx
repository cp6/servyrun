import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import StatCard from "@/Components/StatCard";
import {Table} from "flowbite-react/lib/esm/components/Table";
import React from "react";
import {format} from "date-fns";
import YouAreNew from "@/Components/YouAreNew";

export default function Dashboard({auth}) {

    const user = usePage().props.auth.user;
    const counts = usePage().props.counts;
    const RecentActions = usePage().props.RecentActions;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Hello {user.name}</h2>}
        >
            <Head title="Dashboard"/>
            {counts.servers > 0 ?
                <>
                    <div className="mt-6 px-2 mx-auto max-w-7xl">
                        <div className='grid grid-cols-3 sm:grid-cols-8 gap-3'>
                            <StatCard text='Servers' value={counts.servers} route={route('server.index')}></StatCard>
                            <StatCard text='Connections' value={counts.connections}
                                      route={route('connection.index')}></StatCard>
                            <StatCard text='Keys' value={counts.keys} route={route('key.index')}></StatCard>
                            <StatCard text='IPs' value={counts.ips} route={route('ip.index')}></StatCard>
                            <StatCard text='DBs' value={counts.dbs} route={route('db.index')}></StatCard>
                            <StatCard text='Pings' value={counts.pings} route={route('ping.index')}></StatCard>
                            <StatCard text='Commands' value={counts.commands} route={route('command.index')}></StatCard>
                            <StatCard text='Outputs' value={counts.outputs} route={route('outputs.index')}></StatCard>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="py-4 px-2 mx-auto max-w-7xl">
                            <div className="bg-white dark:bg-gray-700 overflow-hidden rounded-lg shadow-md">
                                <h2 className="px-4 pt-4 font-semibold text-lg text-gray-800 dark:text-white">Recent
                                    actions</h2>
                                {RecentActions.length > 0 ?
                                    <div>
                                        <p className="pl-4 pb-4 text-sm text-blue-500"><a href={route('log.index')}>View
                                            all</a></p>
                                        <Table className='px-4'>
                                            <Table.Head className='bg-gray-200 dark:bg-gray-900 rounded-0'>
                                                <Table.HeadCell className={'text-gray-900 dark:text-gray-100'}>
                                                    When
                                                </Table.HeadCell>
                                                <Table.HeadCell className={'text-gray-900 dark:text-gray-100'}>
                                                    Resource
                                                </Table.HeadCell>
                                                <Table.HeadCell className={'text-gray-900 dark:text-gray-100'}>
                                                    Action
                                                </Table.HeadCell>
                                                <Table.HeadCell
                                                    className={'text-gray-900 dark:text-gray-100 overflow-x-scroll w-40'}>
                                                    Message
                                                </Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body className="divide-y">
                                                {RecentActions.map(
                                                    RecentActions =>
                                                        <Table.Row key={RecentActions.id}
                                                                   className="bg-white dark:border-gray-800 dark:bg-gray-700">
                                                            <Table.Cell
                                                                className={'whitespace-nowrap font-medium text-gray-700 dark:text-gray-200'}>
                                                                {format(new Date(RecentActions.created_at), "hh:mm:ssa do LLL yyyy")}
                                                            </Table.Cell>
                                                            <Table.Cell
                                                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                {RecentActions.resource_type}
                                                            </Table.Cell>
                                                            <Table.Cell
                                                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                                {RecentActions.action}
                                                            </Table.Cell>
                                                            <Table.Cell
                                                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white overflow-x-scroll w-40">
                                                                {RecentActions.message}
                                                            </Table.Cell>
                                                        </Table.Row>
                                                )}
                                            </Table.Body>
                                        </Table>
                                    </div>
                                    :
                                    <p className="pl-4 pb-4 text-sm text-blue-500">No logs yet</p>
                                }
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="mt-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <YouAreNew></YouAreNew>
                </div>
            }
        </AuthenticatedLayout>
    );
}
