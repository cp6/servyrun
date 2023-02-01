import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
import {Button, Card} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import ResponseAlert from "@/Components/Alert";

export default function Index({auth, servers, alert_type, alert_message}) {

    const [hasAlert, setHasAlert] = React.useState(true);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Servers</h2>}
        >
            <Head title="Servers"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button color={'info'} size="xs" href={route('server.create')}>
                        <HiPlus className="mr-2 h-5 w-5"/>
                        Add server
                    </Button>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {servers.map(servers =>
                        <Card key={servers.id} href={route('server.show', servers.id)}
                              className={'dark:bg-gray-700 hover:dark:bg-gray-900'}>
                            <div className="flex justify-end px-1">
                                {servers.operating_system !== null ?
                                    <span
                                        className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{servers.operating_system}</span>
                                    : null
                                }
                                <span
                                    className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{servers.type.name}</span>
                            </div>
                            <div className="flex flex-col items-center pb-3">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {servers.hostname}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{servers.title}</span>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
