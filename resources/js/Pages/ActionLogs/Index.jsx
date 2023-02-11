import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Grid} from 'gridjs-react';
import {format} from "date-fns";
import {GridJsPagination, gridJsTableStyling} from '@/gridJsConfig'
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import {html} from "gridjs";

export default function Index({auth, logs}) {

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Action logs'}</h2>}>
            <Head title={'Action logs'}/>
            <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                    {
                        logs.length === 0
                            ?
                            <ResourceEmptyText resource={'action logs'}></ResourceEmptyText>
                            :
                            <Grid
                                data={logs}
                                columns={[
                                    {
                                        id: "id",
                                        name: "Hostname",
                                        sort: false,
                                        data: (row) => (row.server) ? row.server.hostname : null,
                                    },
                                    {
                                        id: "action",
                                        name: "Action",
                                        sort: true,
                                    },
                                    {
                                        id: "resource_type",
                                        name: "Resource",
                                        sort: false,
                                    },
                                    {
                                        id: "message",
                                        name: "Message",
                                        sort: false,
                                    },
                                    {
                                        id: "id",
                                        name: "View",
                                        data: (row) => html(`<a className="text-blue-700 dark:text-blue-400" href='${route('log.show', row.id)}'>View</a>`),
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
                    }
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
