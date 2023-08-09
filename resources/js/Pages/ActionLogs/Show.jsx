import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import CreatedAtText from "@/Components/CreatedAtText";
import BackButton from "@/Components/BackButton";

export default function Show({auth}) {

    const resource = usePage().props.resource;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"Log #" + resource.id}</h2>}>
            <Head title={"Log #" + resource.id}></Head>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('log.index')}>All logs</BackButton>
                </div>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-6 px-2 mx-auto max-w-6xl lg:py-10">
                        <div className={'grid grid-cols-2'}>
                            <div className={'md:col-span-2 col-span-2'}>
                        <span
                            className="bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{resource.action}</span>
                                <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.resource_type}</h2>
                                <p className="mb-4 text-md font-bold leading-none text-gray-800 md:text-lg dark:text-gray-300">{resource.message}</p>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}
                                               pre_text={'When: '}></CreatedAtText>
                            </div>
                            <div className={'md:col-span-1 col-span-2 pl-4'}>
                                {
                                    (() => {
                                        if (resource.server_id !== null) {
                                            return (
                                                <div className="mt-2">
                                                    <h2 className={'text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200'}>
                                                        <span
                                                            className={'text-gray-600 dark:text-gray-400'}>Server:</span> {resource.server.hostname} {resource.server.title}
                                                    </h2>
                                                </div>
                                            );
                                        }
                                    })()
                                }
                                {
                                    (() => {
                                        if (resource.connection_id !== null) {
                                            return (
                                                <div className="mt-2">
                                                    <h2 className={'text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200'}>
                                                        <span
                                                            className={'text-gray-600 dark:text-gray-400'}>Connection:</span> {resource.connection.username} with {(resource.connection.key_id === null) ? 'Password' : 'Key'}
                                                    </h2>
                                                </div>
                                            );
                                        }
                                    })()
                                }
                                {
                                    (() => {
                                        if (resource.command_id !== null) {
                                            return (
                                                <div className="mt-2">
                                                    <h2 className={'text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200'}>
                                                        <span
                                                            className={'text-gray-600 dark:text-gray-400'}>Command:</span> {resource.command.command}
                                                    </h2>
                                                </div>
                                            );
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
