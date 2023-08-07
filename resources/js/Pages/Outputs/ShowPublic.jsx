import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Card} from "flowbite-react";
import Output from "@/Components/Output";
import GuestLayout from '@/Layouts/GuestLayout';

export default function ShowPublic() {

    const resource = usePage().props.resource;
    const rows = usePage().props.rows;

    return (
        <GuestLayout wide={true}>
            <Head title={"Command " + resource.id + " output"}/>
            <div className="py-6 px-2 mx-auto max-w-7xl lg:py-8">
                <div className="grid gap-2 grid-cols-1 sm:gap-4">
                    <Card>
                        <Output title={"Command " + resource.id} the_command={resource.the_command}
                                created_at={resource.created_at} the_output={resource.output} seconds={resource.seconds_taken} rows={rows}></Output>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
