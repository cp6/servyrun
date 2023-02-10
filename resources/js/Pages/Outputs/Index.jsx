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

export default function Index({auth, outputs}) {
    const user = usePage().props.auth.user;
    const title = 'Command outputs';
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{title}</h2>}>
            <Head title={title}/>
            <div className="py-6 px-2 mx-auto max-w-7xl lg:py-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('command.index')}>Back to commands</BackButton>
                    <IndigoButton href={route('command-group.index')}><HiUserGroup className="mr-2 h-5 w-5" />  Command groups</IndigoButton>
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
                                data: (row) => html(`<a className="text-blue-700 dark:text-blue-400" href='${route('outputs.show', row.id)}'>View</a>`),
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
