import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import Output from "@/Components/Output";
import EmeraldButton from "@/Components/EmeraldButton";
import {HiCpuChip} from "react-icons/all";

export default function Show({auth, resource}) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"Command " + resource.id}</h2>}>
            <Head title={"Command " + resource.id}/>
            <div className="py-6 px-2 mx-auto max-w-7xl lg:py-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <EmeraldButton href={route('server.show', resource.server.id)}><HiCpuChip className="mr-2 h-5 w-5"/>Server</EmeraldButton>
                </div>
                <div className="grid gap-2 grid-cols-1 sm:gap-4">
                    <Card className={'dark:bg-gray-700'}>
                        <Output title={resource.server.hostname} the_command={resource.the_command}
                                created_at={resource.created_at} the_output={resource.output} seconds={resource.seconds_taken} rows={22}></Output>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
