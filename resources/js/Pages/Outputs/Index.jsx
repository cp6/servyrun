import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import {HiUserGroup} from "react-icons/hi";
import IndigoButton from "@/Components/IndigoButton";
import BackButton from "@/Components/BackButton";

export default function Index({auth}) {

    const outputs = usePage().props.outputs;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Command outputs'}</h2>}>
            <Head title={'Command outputs'}/>
            <div className="py-6 px-2 mx-auto max-w-7xl lg:py-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('command.index')}>Back to commands</BackButton>
                    <IndigoButton href={route('command-group.index')}><HiUserGroup className="mr-2 h-5 w-5" />  Command groups</IndigoButton>
                </div>
                <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                    <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                    <Grid
                        data={outputs}
                        columns={[
                            {
                                id: "id",
                                name: "Hostname",
                                sort: false,
                                data: (row) => row.server.hostname,
                            },
                            {
                                id: "the_command",
                                name: "Command",
                                sort: false,
                            },
                            {
                                id: "id",
                                name: "View",
                                sort: false,
                                data: (row) => html(`<a class="text-blue-500 dark:text-blue-300" href='${route('outputs.show', row.id)}'>View</a>`),
                            },
                            {
                                id: "created_at",
                                name: "Datetime",
                                sort: true,
                                formatter: (cell) => (format(new Date(cell), "yyyy-MM-dd HH:mm:ss"))
                            }
                        ]}
                        search={true}
                        className={gridJsTableStyling}
                        pagination={GridJsPagination}
                    />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
