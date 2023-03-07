import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React, {useState} from "react";
import {Grid} from 'gridjs-react';
import {format} from "date-fns";
import {GridJsPagination, gridJsTableStyling} from '@/gridJsConfig'
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import {html} from "gridjs";
import {Button, Modal} from "flowbite-react";
import {HiTrash} from "react-icons/hi";
import ResponseAlert from "@/Components/Alert";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const logs = usePage().props.logs;

    const [showModal, setShowModal] = useState(false);


    const deleteItem = () => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('log.destroy-all'), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Action logs'}</h2>}>
            <Head title={'Action logs'}/>
            <div className="py-8 px-1 mx-auto max-w-7xl lg:py-10">
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div></div>
                        <small className="text-end">
                            <HiTrash
                                className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                onClick={() => setShowModal(true)} title={'Delete ALL logs'}/>
                        </small>
                    </div>
                    {
                        logs.length === 0
                            ?
                            <ResourceEmptyText className={'ml-2 pb-4'} resource={'action logs'}></ResourceEmptyText>
                            :
                            <Grid
                                data={logs}
                                columns={[
                                    {
                                        id: "id",
                                        name: "Hostname",
                                        sort: false,
                                        data: (row) => (row.server) ? row.server.hostname : null,
                                    },
                                    {
                                        id: "action",
                                        name: "Action",
                                        sort: true,
                                    },
                                    {
                                        id: "resource_type",
                                        name: "Resource",
                                        sort: false,
                                    },
                                    {
                                        id: "message",
                                        name: "Message",
                                        sort: false,
                                    },
                                    {
                                        id: "id",
                                        name: "View",
                                        data: (row) => html(`<a className="text-blue-700 dark:text-blue-400" href='${route('log.show', row.id)}'>View</a>`),
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
            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete all logs?
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
