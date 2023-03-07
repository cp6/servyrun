import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {HiUserGroup} from "react-icons/hi";
import {format} from "date-fns";
import AddButton from "@/Components/AddButton";
import {HiListBullet} from "react-icons/all";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const commands = usePage().props.commands;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Commands</h2>}>
            <Head title={'Commands'}/>
                <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <AddButton href={route('command.create')}>Add command</AddButton>
                    </div>
                    <ResponseAlert details={alert}></ResponseAlert>
                    <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                        <div className="flex items-center justify-between mb-2 px-3">
                            <div></div>
                            <small className="text-end">
                                <HiListBullet
                                    className="mr-2 md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('outputs.index')}
                                    title={'Command outputs'}/>
                                <HiUserGroup
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('command-group.index')}
                                    title={'Command groups'}/>
                            </small>
                        </div>
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
