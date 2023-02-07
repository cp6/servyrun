import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import {Button} from "flowbite-react";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {HiUserGroup} from "react-icons/hi";
import {format} from "date-fns";
import TealButton from "@/Components/TealButton";

export default function Index({auth, pings, hasAlert, alert_type, alert_message}) {
    const user = usePage().props.auth.user;
    const main_title = 'Pings';
    const title = 'Pings';

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{main_title}</h2>}>
            <Head title={main_title}/>
                <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <TealButton href={route('ping-group.index')}><HiUserGroup className="mr-2 h-5 w-5" />Ping groups</TealButton>
                    </div>
                    <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                        <section className="p-2 shadow-md dark:shadow-md bg-white/50 dark:bg-transparent dark:shadow rounded-lg dark:border dark:border-gray-700">
                        {
                            pings.length === 0
                                ?
                                <h2 className={'text-md my-4 font-semibold leading-none text-gray-700 md:text-lg dark:text-gray-400'}>No
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
                                            formatter: (cell) => (cell === 1) ? 'Y' : 'N'
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
        </div>
        </AuthenticatedLayout>
    );
}
