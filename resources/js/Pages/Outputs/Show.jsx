import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import Output from "@/Components/Output";
import {HiServer} from "react-icons/hi";

export default function Show({auth}) {

    const resource = usePage().props.resource;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"Command " + resource.id}</h2>}>
            <Head title={"Command " + resource.id}/>
            <div className="py-6 px-2 mx-auto max-w-7xl lg:py-8">
                <div className="flex flex-wrap gap-2 mb-4"></div>
                <div className="grid gap-2 grid-cols-1 sm:gap-4">
                    <Card className={'dark:bg-gray-700'}>
                        <div className="flex items-center justify-between">
                            <div></div>
                            <small className="text-end">
                                <HiServer className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                          onClick={event => window.location.href = route('server.show', resource.server.id)} title={'Go to server'}/>
                            </small>
                        </div>
                        <Output title={resource.server.hostname} the_command={resource.the_command}
                                created_at={resource.created_at} the_output={resource.output} seconds={resource.seconds_taken} rows={22}></Output>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
