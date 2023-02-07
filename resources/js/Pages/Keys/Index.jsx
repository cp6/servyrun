import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import ResponseAlert from "@/Components/Alert";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import AddButton from "@/Components/AddButton";

export default function Index({auth, keys, alert_type, alert_message}) {
    const [hasAlert, setHasAlert] = React.useState(true);
    const user = usePage().props.auth.user;
    const main_title = 'Keys';
    const title = 'key';
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{main_title}</h2>}>
            <Head title={main_title}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('key.create')}>Add key</AddButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">


                    {
                        keys.length === 0
                            ?
                            <ResourceEmptyText resource={'keys'}></ResourceEmptyText>
                            :
                            keys.map(keys => <Card key={keys.id}
                                                   href={route('key.show', keys.id)} className={'dark:bg-gray-700 hover:dark:bg-gray-900'}>
                                <div className="flex justify-end px-1">
                                             <span
                                                 className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                 {
                                                     (() => {
                                                         if (typeof (keys.hashed_password) != "undefined" && keys.hashed_password !== null) {
                                                             return (
                                                                 "HASH PASSWORD"
                                                             )
                                                         } else if (typeof (keys.password) != "undefined" && keys.password !== null) {
                                                             return (
                                                                 "PASSWORD"
                                                             )
                                                         } else {
                                                             return (
                                                                 "NO PASSWORD"
                                                             )
                                                         }
                                                     })()
                                                 }
                                             </span>
                                </div>
                                <div className="flex flex-col justify-center items-center pb-3">
                                    <h5 className="mb-1 lg font-medium text-gray-900 dark:text-white">{keys.original_name}</h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400"></span>
                                </div>
                            </Card>)
                    }

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
