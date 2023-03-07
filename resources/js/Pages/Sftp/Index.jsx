import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";
import SftpConnectionStatusDot from "@/Components/SftpConnectionStatusDot";

export default function Index({auth}) {

    const connections = usePage().props.connections;
    const alert = usePage().props.alert;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'SFTP connections'}</h2>}>
            <Head title={'SFTP connections'}/>
            <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('sftp.create')}>Add SFTP connection</AddButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {connections.map(connection =>
                        <section key={connection.id}
                                 className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                 onClick={event => window.location.href = route('sftp.show', connection.id)}>
                            <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                              <span
                                  className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                 {
                                                     (() => {
                                                         if (typeof (connection.key_id) != "undefined" && connection.key_id !== null) {
                                                             return (
                                                                 "KEY"
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
                                            className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                                 PORT {connection.port}
                                             </span>
                                    </div>
                                    <small className="text-end">
                                        <SftpConnectionStatusDot resource={connection}></SftpConnectionStatusDot>
                                    </small>
                                </div>

                                <div className="flex flex-col justify-center items-center pb-3">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        {connection.username}
                                    </h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
             {connection.server.hostname}
      </span>
                                </div>
                            </div>
                        </section>)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
