import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import AddButton from "@/Components/AddButton";
import BackButton from "@/Components/BackButton";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const groups = usePage().props.groups;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Ping groups</h2>}
        >
            <Head title="Servers"/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('ping.index')}>All pings</BackButton>
                    <AddButton href={route('ping-group.create')}>Create ping group</AddButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">

                    {(groups.length > 0) ?
                        groups.map(groups =>
                            <section key={groups.id}
                                     className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                     onClick={event => window.location.href = route('ping-group.show', groups.id)}>
                                <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                            {groups.title}
                                        </h5>
                                        <div className="flex flex-col justify-center items-center pb-3">
                                            {groups.assigned.map(assign =>
                                                <span key={assign.server.id}
                                                      className="text-sm text-gray-500 dark:text-gray-400">{assign.server.hostname}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>)
                        :
                        <ResourceEmptyText resource={'ping groups'}></ResourceEmptyText>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
