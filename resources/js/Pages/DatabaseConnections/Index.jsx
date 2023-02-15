import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
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
                        connections.map(connection =>
                            <section key={connection.id}
                                     className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                     onClick={event => window.location.href = route('db.connection.show', connection.id)}>
                                <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <small className="text-end"></small>
                                    </div>
                                <div className="flex flex-col items-center pb-3">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        {connection.host}
                                    </h5>
                                    <span className="text-md text-gray-500 dark:text-gray-400">{connection.title}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-300">{connection.username}</span>
                                </div>
                                </div>
                            </section>
                        )
                        :
                        <ResourceEmptyText resource={'database connections'}></ResourceEmptyText>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
