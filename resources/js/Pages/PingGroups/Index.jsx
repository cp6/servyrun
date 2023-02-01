import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Button, Card} from "flowbite-react";
import {HiOutlineArrowLeft, HiPlus} from "react-icons/hi";
import ResponseAlert from "@/Components/Alert";
import ResourceEmptyText from "@/Components/ResourceEmptyText";

export default function Index({auth, mustVerifyEmail, groups, hasAlert, alert_type, alert_message}) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Ping groups</h2>}
        >
            <Head title="Servers"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button color={'info'} size="xs" href={route('ping.index')}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                        All pings
                    </Button>
                    <Button color={'success'} size="xs" href={route('ping-group.create')}>
                        <HiPlus className="mr-2 h-5 w-5" />
                        Create ping group
                    </Button>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">

                    {(groups.length > 0)?
                        groups.map(groups => <Card className={'dark:bg-gray-700 dark:border-gray-900'} key={groups.id} href={route('ping-group.show', groups.id)}>
                            <div className="flex flex-col items-center pb-3">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {groups.title}
                                </h5>
                                {groups.assigned.map(assign =>
                                    <span key={assign.server.id}
                                          className="text-sm text-gray-500 dark:text-gray-400">{assign.server.hostname}</span>
                                )}
                            </div>
                        </Card>)
                        :
                        <ResourceEmptyText resource={'ping groups'}></ResourceEmptyText>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
