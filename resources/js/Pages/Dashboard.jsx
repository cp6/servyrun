import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import StatCard from "@/Components/StatCard";
import {Table} from "flowbite-react/lib/esm/components/Table";
import React from "react";
import {format} from "date-fns";
import YouAreNew from "@/Components/YouAreNew";

export default function Dashboard({auth}) {

    const user = usePage().props.auth.user;
    const serversCount = usePage().props.serversCount;
    const IpCount = usePage().props.IpCount;
    const ConnectionCount = usePage().props.ConnectionCount;
    const KeyCount = usePage().props.KeyCount;
    const DbCount = usePage().props.DbCount;
    const PingsCount = usePage().props.PingsCount;
    const CommandCount = usePage().props.CommandCount;
    const OutputCount = usePage().props.OutputCount;
    const RecentActions = usePage().props.RecentActions;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Hello {user.name}</h2>}
        >
            <Head title="Dashboard"/>

            {serversCount > 0 ?
                <>
                    <div className="mt-6 px-2 mx-auto max-w-7xl">
                        <div className='grid grid-cols-3 sm:grid-cols-8 gap-3'>
                            <StatCard text='Servers' value={serversCount} route={route('server.index')}></StatCard>
                            <StatCard text='Connections' value={ConnectionCount}
                                      route={route('connection.index')}></StatCard>
                            <StatCard text='Keys' value={KeyCount} route={route('key.index')}></StatCard>
                            <StatCard text='IPs' value={IpCount} route={route('ip.index')}></StatCard>
                            <StatCard text='DBs' value={DbCount} route={route('db.index')}></StatCard>
                            <StatCard text='Pings' value={PingsCount} route={route('ping.index')}></StatCard>
                            <StatCard text='Commands' value={CommandCount} route={route('command.index')}></StatCard>
                            <StatCard text='Outputs' value={OutputCount} route={route('outputs.index')}></StatCard>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="py-4 px-2 mx-auto max-w-7xl">
                            <div className="bg-white dark:bg-gray-700 overflow-hidden rounded-lg shadow-md">
                                <div className="p-6 text-gray-900 font-bold dark:text-gray-300">Recent actions</div>
                                <Table className='px-4'>
                                    <Table.Head className='bg-gray-200 dark:bg-gray-600 rounded-0'>
                                        <Table.HeadCell>
                                            Resource
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Action
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Message
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            When
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">

                                        {RecentActions.map(
                                            RecentActions =>
                                                <Table.Row key={RecentActions.id}
                                                           className="bg-white dark:border-gray-800 dark:bg-gray-700">
                                                    <Table.Cell
                                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {RecentActions.resource_type}
                                                    </Table.Cell>
                                                    <Table.Cell
                                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {RecentActions.action}
                                                    </Table.Cell>
                                                    <Table.Cell
                                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {RecentActions.message}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {format(new Date(RecentActions.created_at), "hh:mm:ssa do LLL yyyy")}
                                                    </Table.Cell>
                                                </Table.Row>
                                        )}

                                    </Table.Body>
                                </Table>
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
