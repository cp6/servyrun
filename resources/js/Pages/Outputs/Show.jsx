import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Alert, Button, Card} from "flowbite-react";
import Output from "@/Components/Output";

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
                </div>
                <div className="grid gap-2 grid-cols-1 sm:gap-4">
                    <Card>
                        <Output title={resource.server.hostname} the_command={resource.the_command}
                                created_at={resource.created_at} the_output={resource.output} seconds={resource.seconds_taken}></Output>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
