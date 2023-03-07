import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiRefresh, HiCalculator, HiTrash} from "react-icons/hi";
import axios from "axios";
import BackButton from "@/Components/BackButton";

export default function Show({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;
    const tables = usePage().props.tables;
    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

    const [buttonsDisabled, setButtonsDisabled] = useState(false);



    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('db.show.tables.destroy', [resource.id]), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    const refreshTables = () => {
        setButtonsDisabled(true);

        const config = {
            headers: {Authorization: `Bearer ${user.api_token}`}
        };

        axios.get(route('api.db.refresh', resource.id), config).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error refreshing tables');
            setButtonsDisabled(false);
        });

    };

    const getSize = () => {
        setButtonsDisabled(true);

        const config = {
            headers: {Authorization: `Bearer ${user.api_token}`}
        };

        axios.get(route('api.db.table.size', resource.id), config).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error refreshing tables');
            setButtonsDisabled(false);
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.name + " tables"}</h2>}>
            <Head title={resource.name + " tables"}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('db.show', resource.id)}>Back to Database</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between">
                            <div><h2
                                className="mt-1 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.name} ({resource.conn.host})</h2>
                            </div>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete table'}/>
                                <HiRefresh
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={refreshTables}
                                    title={'Refresh tables'}/>
                                <HiCalculator
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={getSize}
                                    title={'Get size and row counts'}/>
                            </small>
                        </div>
                        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Tables</h2>

                        {tables.length > 0 ?
                            <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {tables.map(table =>
                                    <li key={table.id}>
                                        <a href={route('db.table.columns.show', [resource.id, table.id])}>{table.name}</a>
                                        {
                                            (table.row_count !== null) ?
                                                <span
                                                    className="ml-1 bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(table.row_count)} rows</span>
                                                : null
                                        }
                                        {
                                            (table.size_mb !== null) ?
                                                <span
                                                    className="ml-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(table.size_mb)} MB</span>
                                                : null
                                        }
                                    </li>)}
                            </ul>
                            :
                            <p className={'text-md my-1 font-semibold text-gray-600 md:text-lg dark:text-gray-300'}>There
                                are no tables. Perhaps your connection is not correct</p>
                        }
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this table?
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
