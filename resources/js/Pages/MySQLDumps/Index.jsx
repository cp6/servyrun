import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const dumps = usePage().props.dumps;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">MySQL dumps</h2>}
        >
            <Head title="MySQL dumps"/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('mysqldump.create')}>Add MySQL dump</AddButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {dumps.length > 0 ?
                        dumps.map(dump =>
                            <section key={dump.id}
                                     className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                     onClick={event => window.location.href = route('mysqldump.show', dump.id)}>
                                <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <small className="text-end"></small>
                                    </div>
                                    <div className="flex flex-col items-center pb-3">
                                        <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                            {dump.database.name}
                                        </h2>
                                        <span
                                            className="text-sm text-gray-500 dark:text-gray-400">{dump.database_conn.username}@{dump.database_conn.host}</span>
                                    </div>
                                </div>
                            </section>
                        )
                        :
                        <ResourceEmptyText resource={'MySQL dumps'}></ResourceEmptyText>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
