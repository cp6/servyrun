import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
import {HiDownload, HiLockOpen} from "react-icons/hi";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";
import TealButton from "@/Components/TealButton";
import IndigoButton from "@/Components/IndigoButton";

export default function Index({auth, databases, alert_type, alert_message}) {

    const [hasAlert, setHasAlert] = React.useState(true);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Databases</h2>}
        >
            <Head title="Databases"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('db.create')}>Add database</AddButton>
                    <TealButton href={route('db.connection.index')}><HiLockOpen className="mr-2 h-5 w-5"/> Database
                        connections</TealButton>
                    <IndigoButton href={route('mysqldump.index')}><HiDownload
                        className="mr-2 h-5 w-5"/> MySQLdump</IndigoButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {databases.length > 0 ?
                        databases.map(db =>
                                <section key={db.id}
                                         className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                         onClick={event => window.location.href = route('db.show', db.id)}>
                                    <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
               <span
                   className="bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{db.conn.type === 1 ? 'MySQL' : 'Other'}</span>
                                                {db.conn.version !== null ?
                                                    <span
                                                        className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{db.conn.version}</span>
                                                    :
                                                    null}
                                            </div>
                                            <small className="text-end"></small>
                                        </div>
                                        <div className="flex flex-col items-center pb-3">
                                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                {db.name}
                                            </h5>
                                            <span
                                                className="text-sm text-gray-500 dark:text-gray-400">{db.conn.username}@{db.conn.host}</span>
                                        </div>
                                    </div>
                                </section>
                        )
                        :
                        <ResourceEmptyText resource={'databases'}></ResourceEmptyText>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
