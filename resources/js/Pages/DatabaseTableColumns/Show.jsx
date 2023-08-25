import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiDocumentText, HiDownload, HiRefresh, HiTrash} from "react-icons/hi";
import axios from "axios";
import BackButton from "@/Components/BackButton";
export default function Show({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;
    const database = usePage().props.database;
    const table = usePage().props.table;
    const columns = usePage().props.columns;

    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

    const refreshColumns = () => {

        const config = {
            headers: {Authorization: `Bearer ${user.api_token}`}
        };

        axios.get(route('api.db.table.refresh', [database.id, table.id]), config).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error refreshing columns');
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{table.name + " table columns"}</h2>}>
            <Head title={table.name + " table columns"}></Head>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('db.show.tables', database.id)}>Back to database tables</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between">
                            <div><h2 className="mb-3 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">
                                {database.name}, {table.name} table columns</h2>
                                <p className="mb-4 text-sm text-gray-900 dark:text-white">Click column name to download as json</p></div>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete columns'}/>
                                <HiRefresh
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={refreshColumns}
                                    title={'Refresh columns'}/>
                                <HiDownload
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href =route('db.table.columns.download', [database.id, table.id])}
                                    title={'Download as JSON'}/>
                                <HiDocumentText
                                    className={"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"}
                                    onClick={event => window.location.href = route('db.table.columns.pdf', [database.id, table.id])}
                                    title={'Download as PDF'}/>
                            </small>
                        </div>
                        <ul className="max-w-3xl space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                            {columns.map(columns =>
                                <li key={columns.id}>
                                    <span className="text-gray-900 dark:text-gray-200"><a href={route('db.table.columns.download.single', [database.id, table.id, columns.id])}>{columns.name}</a></span>
                                    <span
                                        className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{columns.type}</span>
                                    {
                                        (columns.is_nullable === 1) ?
                                            <span
                                                className="ml-1 bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">nullable</span>
                                            :
                                            <span
                                                className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">NOT nullable</span>
                                    }
                                    {
                                        (columns.default !== null) ?
                                            <span
                                                className="ml-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Default: {columns.default}</span>
                                            : null
                                    }
                                    {
                                        (columns.key !== null) ?
                                            <span
                                                className="ml-1 bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Key: {columns.key}</span>
                                            : null
                                    }
                                    {
                                        (columns.extra !== null) ?
                                            <span
                                                className="ml-1 bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-500 dark:text-gray-100">Extra: {columns.extra}</span>
                                            : null
                                    }
                                </li>)}
                        </ul>
                    </div>
                </section>
            </div>

        </AuthenticatedLayout>
    );
}
