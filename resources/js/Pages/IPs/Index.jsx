import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import FlexAddButtonDiv from "@/Components/FlexAddButtonDiv";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const ips = usePage().props.ips;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">IP addresses</h2>}>
            <Head title={'IP addresses'}/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <FlexAddButtonDiv href={route('ip.create')} resource={'IP'}/>
                <ResponseAlert details={alert}></ResponseAlert>
                {
                    (ips.length > 0) ?
                        <section
                            className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
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
                                        data: (row) => (row.server_id) ? html(`<a href='${route('server.show', row.server_id)}' class="dark:text-blue-300 text-blue-500">${row.server.hostname}</a>`) : null,
                                    },
                                    {
                                        id: "id",
                                        name: "View",
                                        data: (row) => html(`<a class="text-blue-500 dark:text-blue-300" href='${route('ip.show', row.id)}'>View</a>`),
                                    },
                                    {
                                        id: "id",
                                        name: "Edit",
                                        data: (row) => html(`<a class="text-blue-500 dark:text-blue-300" href='${route('ip.edit', row.id)}'>Edit</a>`),
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
                        :
                        <ResourceEmptyText className={'ml-2 pb-4'} resource={'IP addresses'}></ResourceEmptyText>
                }

            </div>
        </AuthenticatedLayout>
    );
}
