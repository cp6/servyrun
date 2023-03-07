import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import BackButton from "@/Components/BackButton";

export default function IndexCommand({auth}) {

    const command = usePage().props.command;
    const outputs = usePage().props.outputs;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Command outputs for ' + command.title}</h2>}>
            <Head title={'Command outputs for ' + command.title}/>
            <div className="py-6 px-2 mx-auto max-w-7xl lg:py-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('command.index')}>Back to commands</BackButton>
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
                                formatter: (cell) => html(`<a className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" href=${route('outputs.show', cell)}>View</a>`)
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
