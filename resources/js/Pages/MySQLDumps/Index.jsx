import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import ResponseAlert from "@/Components/Alert";
import AddButton from "@/Components/AddButton";

export default function Index({auth, dumps, alert_type, alert_message}) {

    const [hasAlert, setHasAlert] = React.useState(true);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">MySQL dumps</h2>}
        >
            <Head title="MySQL dumps"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('db.create')}>Add MySQL dump</AddButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {dumps.length > 0 ?
                        dumps.map(databases =>
                            <Card key={databases.id} href={route('mysqldump.show', databases.id)}
                                  className={'dark:bg-gray-700 hover:dark:bg-gray-900'}>
                                <div className="flex flex-col items-center pb-3">
                                    <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        {databases.database.name}
                                    </h2>
                                    <span
                                        className="text-sm text-gray-500 dark:text-gray-400">{databases.database_conn.username}@{databases.database_conn.host}</span>
                                </div>
                            </Card>
                        )
                        :
                        <ResourceEmptyText resource={'MySQL dumps'}></ResourceEmptyText>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
