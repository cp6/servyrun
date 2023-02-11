import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import {HiDatabase} from "react-icons/hi";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";
import TealButton from "@/Components/TealButton";

export default function Index({auth, connections, alert_type, alert_message}) {

    const [hasAlert, setHasAlert] = React.useState(true);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">DB connections</h2>}
        >
            <Head title="DB connections"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('db.connection.create')}>Add DB connection</AddButton>
                    <TealButton href={route('db.index')}><HiDatabase className="mr-2 h-5 w-5" />Databases</TealButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">

                    { connections.length > 0 ?
                        connections.map(connections =>
                            <Card key={connections.id} href={route('db.connection.show', connections.id)} className={'dark:bg-gray-700 hover:dark:bg-gray-900'}>
                                <div className="flex justify-end px-1">
                                <span
                                    className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{connections.type === 1? 'MySQL' : 'Other'}</span>
                                    {connections.version !== null ?
                                        <span
                                            className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{connections.version}</span>
                                        :
                                        null}
                                </div>
                                <div className="flex flex-col items-center pb-3">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        {connections.host}
                                    </h5>
                                    <span className="text-md text-gray-500 dark:text-gray-400">{connections.title}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-300">{connections.username}</span>
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
