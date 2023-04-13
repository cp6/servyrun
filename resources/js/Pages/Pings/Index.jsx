import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {HiUserGroup} from "react-icons/hi";
import {format} from "date-fns";
import IndigoButton from "@/Components/IndigoButton";
import ResponseAlert from "@/Components/Alert";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const pings = usePage().props.pings;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Pings</h2>}>
            <Head title={'Pings'}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <IndigoButton href={route('ping-group.index')}><HiUserGroup className="mr-2 h-5 w-5"/>Ping
                        groups</IndigoButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                    {
                        pings.length === 0
                            ?
                            <h2 className={'text-md p-2 font-semibold leading-none text-yellow-500 md:text-lg dark:text-yellow-400'}>No
                                pings yet</h2>
                            :
                            <Grid
                                data={pings}
                                columns={[
                                    {
                                        id: "from_server_id",
                                        name: "From",
                                        sort: false,
                                        data: (row) => (row.from_server) ? html(`<a href='${route('server.show', row.from_server.id)}'>${row.from_server.hostname}</a>`) : null,
                                    },
                                    {
                                        id: "server_id",
                                        name: "To",
                                        sort: true,
                                        data: (row) => (row.to_server) ? html(`<a href='${route('server.show', row.to_server.id)}'>${row.to_server.hostname}</a>`) : null,
                                    },
                                    {
                                        id: "was_up",
                                        name: "Up",
                                        sort: true,
                                        formatter: (cell) => (cell === 1) ? html('<span class="text-green-500">Y</span>') :  html('<span class="text-red-500">N</span>')
                                    },
                                    {
                                        id: "avg",
                                        name: "AVG",
                                        sort: true
                                    },
                                    {
                                        id: "min",
                                        name: "MIN",
                                        sort: true
                                    },
                                    {
                                        id: "max",
                                        name: "MAX",
                                        sort: true
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
