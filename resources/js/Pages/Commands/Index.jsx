import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {HiPlay} from "react-icons/hi";
import {format} from "date-fns";
import AddButton from "@/Components/AddButton";
import EmeraldButton from "@/Components/EmeraldButton";

export default function Index({auth, commands, hasAlert, alert_type, alert_message}) {
    const user = usePage().props.auth.user;
    const main_title = 'Commands';
    const title = 'command';

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{main_title}</h2>}>
            <Head title={main_title}/>
                <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <AddButton href={route('command.create')}>Add command</AddButton>
                        <EmeraldButton href={route('outputs.index')}><HiPlay className="mr-2 h-5 w-5" />  Command outputs</EmeraldButton>
                    </div>
                    <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                                   alert_message={alert_message}></ResponseAlert>
                    <section className="p-2 shadow-md dark:shadow-md bg-white/50 dark:bg-transparent dark:shadow rounded-lg dark:border dark:border-gray-700">
                    {
                        commands.length === 0
                            ?
                            <h2 className={'text-md my-4 font-semibold leading-none text-gray-700 md:text-lg dark:text-gray-400'}>No
                                commands currently</h2>
                            :
                            <Grid
                                data={commands}
                                columns={[
                                    {
                                        id: "title",
                                        name: "Name",
                                        sort: true
                                    },
                                    {
                                        id: "command",
                                        name: "Command",
                                        sort: false
                                    },
                                    {
                                        id: "id",
                                        name: "Edit",
                                        data: (row) => html(`<a className="text-blue-700 dark:text-blue-400" href='${route('command.edit', row.id)}'>Edit</a>`),
                                    },
                                    {
                                        id: "id",
                                        name: "Outputs",
                                        data: (row) => html(`<a className="text-blue-700 dark:text-blue-400" href='${route('outputs.show.command', row.id)}'>View</a>`),
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
                    }
            </section>
                </div>
        </AuthenticatedLayout>
    );
}
