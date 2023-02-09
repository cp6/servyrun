import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import AddButton from "@/Components/AddButton";

export default function Index({auth, ips, hasAlert, alert_type, alert_message}) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">IP addresses</h2>}>
            <Head title={'IP addresses'}/>
                <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <AddButton href={route('ip.create')}>Add IP</AddButton>
                    </div>
                    <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                                   alert_message={alert_message}></ResponseAlert>
                    <section className="p-2 shadow-md dark:shadow-md bg-white/50 dark:bg-transparent dark:shadow rounded-lg dark:border dark:border-gray-700">
                    <Grid
                        data={ips}
                        columns={[
                            {
                                id: "ip",
                                name: "IP",
                                sort: true
                            },
                            {
                                id: "isp",
                                name: "ISP",
                                sort: false
                            },
                            {
                                id: "id",
                                name: "Server",
                                sort: true,
                                data: (row) => (row.server_id) ? html(`<a href='${route('server.show', row.server_id)}'>${row.server.hostname}</a>`) : null,
                            },
                            {
                                id: "id",
                                name: "Edit",
                                data: (row) => html(`<a className="text-blue-700 dark:text-blue-400" href='${route('ip.edit', row.id)}'>Edit</a>`),
                            },
                            {
                                id: "created_at",
                                name: "Created",
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
        </AuthenticatedLayout>
    );
}
