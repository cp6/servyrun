import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import AddButton from "@/Components/AddButton";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const keys = usePage().props.keys;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Keys'}</h2>}>
            <Head title={'Keys'}/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <AddButton href={route('key.create')}>Add key</AddButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                    {
                        keys.length === 0
                            ?
                            <ResourceEmptyText resource={'keys'}></ResourceEmptyText>
                            :
                            keys.map(key =>
                                <section key={key.id}
                                         className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer"
                                         onClick={event => window.location.href = route('key.show', key.id)}>
                                    <div className="md:py-2 py-4 px-2 mx-auto max-w-6xl">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                {
                                                    (() => {
                                                        if (typeof (key.password) != "undefined" && key.password !== null) {
                                                            return (
                                                                <span
                                                                    className="bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">PASSWORD</span>
                                                            )
                                                        } else {
                                                            return (
                                                                <span
                                                                    className="bg-red-200 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">NO PASSWORD</span>
                                                            )
                                                        }
                                                    })()
                                                }
                                            </div>
                                            <small className="text-end"></small>
                                        </div>
                                        <div className="flex flex-col justify-center items-center pb-3">
                                            <h5 className="mb-2 lg font-medium text-gray-900 dark:text-white">{key.original_name}</h5>
                                        </div>
                                    </div>
                                </section>
                            )
                    }

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
