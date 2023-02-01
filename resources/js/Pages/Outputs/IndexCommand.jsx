import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";

export default function IndexCommand({auth, command, outputs}) {
    const user = usePage().props.auth.user;
    const title = 'Command outputs for ';
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{title + command.title}</h2>}>
            <Head title={title + command.title}/>
            <div className="py-6 px-2 mx-auto max-w-7xl lg:py-8">
                <div className="flex flex-wrap gap-2 mb-4">
                </div>
                <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                    <section className="p-2 shadow-md dark:shadow-md bg-white/50 dark:bg-transparent dark:shadow rounded-lg dark:border dark:border-gray-700">
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
                                formatter: (cell) => html(`<a class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" href=${route('outputs.show', cell)}>View</a>`)
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
