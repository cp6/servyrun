import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Grid} from 'gridjs-react';
import {format} from "date-fns";
import {GridJsPagination, gridJsTableStyling} from '@/gridJsConfig'
import ResourceEmptyText from "@/Components/ResourceEmptyText";

export default function Index({auth, logs}) {

    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Action logs'}</h2>}>
            <Head title={'Action logs'}/>
            <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                <section
                    className="p-2 shadow-md dark:shadow-md bg-white/50 dark:bg-transparent dark:shadow rounded-lg dark:border dark:border-gray-700">
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
