import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {HiKey} from "react-icons/hi";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";
import EmeraldButton from "@/Components/EmeraldButton";
import ConnectionStatusDot from "@/Components/ConnectionStatusDot";
import ResourceEmptyText from "@/Components/ResourceEmptyText";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const connections = usePage().props.connections;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Server connections'}</h2>}>
            <Head title={'Server connections'}/>
            <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('connection.create')}>Add a connection</AddButton>
                    <EmeraldButton href={route('key.index')}><HiKey className="mr-2 h-5 w-5"/>Keys</EmeraldButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {
                        connections.length === 0
                            ?
                            <ResourceEmptyText resource={'connections'}></ResourceEmptyText>
                            :
                            connections.map(connection =>
                                <section key={connection.id}
                                         className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                         onClick={event => window.location.href = route('connection.show', connection.id)}>
                                    <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
<span
    className="bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                                 {
                                                     (() => {
                                                         if (typeof (connection.key_id) != "undefined" && connection.key_id !== null) {
                                                             return (
                                                                 "KEY"
                                                             )
                                                         } else if (typeof (connection.hashed_password) != "undefined" && connections.hashed_password !== null) {
                                                             return (
                                                                 "HASH PASSWORD"
                                                             )
                                                         } else {
                                                             return (
                                                                 "PASSWORD"
                                                             )
                                                         }
                                                     })()
                                                 }
                                             </span>
                                                <span
                                                    className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                 PORT {connection.ssh_port}
                                             </span>
                                            </div>
                                            <small className="text-end">
                                                <ConnectionStatusDot resource={connection}></ConnectionStatusDot>
                                            </small>
                                        </div>
                                        <div className="flex flex-col justify-center items-center pb-3">
                                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                {connection.username}
                                            </h5>
                                            <span
                                                className="text-sm text-gray-500 dark:text-gray-400">{connection.server.hostname}</span>
                                        </div>
                                    </div>
                                </section>)
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
