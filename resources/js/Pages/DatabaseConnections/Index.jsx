import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
import {Button, Card} from "flowbite-react";
import {HiDatabase, HiPlus} from "react-icons/hi";
import ResourceEmptyText from "@/Components/ResourceEmptyText";

export default function Index({auth, connections}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">DB connections</h2>}
        >
            <Head title="DB connections"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button color={'info'} size="xs" href={route('db.connection.create')}>
                        <HiPlus className="mr-2 h-5 w-5" />
                        Add DB connection
                    </Button>
                    <Button color={'success'} size={'xs'} href={route('db.index')}>
                        <HiDatabase className="mr-2 h-5 w-5" />
                        Databases
                    </Button>
                </div>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">

                    { connections.length > 0 ?
                        connections.map(connections =>
                            <Card key={connections.id} href={route('db.connection.show', connections.id)}>
                                <div className="flex justify-end px-1">
                                <span
                                    className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{connections.type === 1? 'MySQL' : 'Other'}</span>
                                </div>
                                <div className="flex flex-col items-center pb-3">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        {connections.host}
                                    </h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{connections.title}</span>
                                </div>
                            </Card>
                        )
                        :
                        <ResourceEmptyText resource={'database connections'}></ResourceEmptyText>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
