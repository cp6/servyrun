import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiDownload, HiOutlineArrowLeft, HiRefresh} from "react-icons/hi";
import axios from "axios";

export default function Show({auth, resource, database, table, columns, alert_type, alert_message}) {
    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('db.connection.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    const refreshColumns = () => {
        setButtonsDisabled(true);

        const config = {
            headers: {Authorization: `Bearer ${user.api_token}`}
        };

        axios.get(route('api.db.table.refresh', [database.id, table.id]), config).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error refreshing columns');
            setButtonsDisabled(false);
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{table.name + " table columns"}</h2>}>
            <Head title={table.name + " table columns"}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button color={'info'} size="xs" href={route('db.show.tables', database.id)}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5"/>
                        Back to database tables
                    </Button>
                    <Button color={'success'} onClick={refreshColumns} size="xs" disabled={buttonsDisabled}>
                        <HiRefresh className="mr-2 h-5 w-5"/>
                        Refresh columns
                    </Button>
                    <Button color={'warning'} href={route('db.table.columns.download', [database.id, table.id])} size="xs"
                            disabled={buttonsDisabled}>
                        <HiDownload className="mr-2 h-5 w-5"/>
                        Download as JSON
                    </Button>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-900 rounded-lg">
                    <div className="py-6 px-2 mx-auto max-w-4xl lg:py-10">
                        <h2 className="mt-4 mb-3 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">
                            {database.name}, {table.name} table columns</h2>
                        <ul className="max-w-3xl space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                            {columns.map(columns =>
                                <li key={columns.id}>
                                    <span className="text-gray-900 dark:text-gray-200">{columns.name}</span>
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
                                                className="ml-1 bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Extra: {columns.extra}</span>
                                            : null
                                    }
                                </li>)}
                        </ul>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this DB connection?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={deleteItem}>
                                Yes, I'm sure
                            </Button>
                            <Button onClick={() => setShowModal(false)} color="gray">
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </AuthenticatedLayout>
    );
}
