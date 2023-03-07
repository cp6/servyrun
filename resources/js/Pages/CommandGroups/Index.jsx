import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import ResponseAlert from "@/Components/Alert";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import AddButton from "@/Components/AddButton";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const groups = usePage().props.groups;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Command groups</h2>}>
            <Head title={'Command groups'}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('command-group.create')}>Add command group</AddButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {
                        groups.length === 0
                            ?
                            <ResourceEmptyText resource={'command groups'}></ResourceEmptyText>
                            :
                            groups.map(group => <Card key={group.id}
                                                   href={route('command-group.show', group.id)} className={'dark:bg-gray-700 hover:dark:bg-gray-900'}>
                                <div className="flex justify-end px-1">
                                             <span
                                                 className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                 {
                                                     (() => {
                                                         if (group.server_count !== null) {
                                                             return (
                                                                 (group.server_count === 1)? group.server_count + " server" :  group.server_count + " servers"
                                                             )
                                                         } else {
                                                             return (
                                                                 "No servers"
                                                             )
                                                         }
                                                     })()
                                                 }
                                             </span>
                                </div>
                                <div className="flex flex-col justify-center items-center pb-3">
                                    <h5 className="mb-1 lg font-medium text-gray-900 dark:text-white">{group.title}</h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{group.the_command.title}</span>
                                </div>
                            </Card>)
                    }

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
