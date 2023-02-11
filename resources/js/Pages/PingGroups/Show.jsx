import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';
import React, {useState} from "react";
import {Button, Modal} from "flowbite-react";
import {Grid} from "gridjs-react";
import ResponseAlert from "@/Components/Alert";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import {HiPencil, HiPlay, HiTrash} from "react-icons/hi";
import BackButton from "@/Components/BackButton";

export default function Show({auth, pingGroup, pings, hasAlert, alert_type, alert_message}) {

    const [showModal, setShowModal] = useState(false);

    const {post} = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('ping-group.run2', pingGroup.id));
    };

    const deleteItem = () => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('ping-group.destroy', pingGroup.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{'Ping group: ' + pingGroup.title}</h2>}>
            <Head title={'Ping group ' + pingGroup.title}/>
                <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <BackButton href={route('ping.index')}>All pings</BackButton>
                    </div>
                    <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                                   alert_message={alert_message}></ResponseAlert>
                    <div className="px-1 mx-auto max-w-7xl">
                        <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                            <div className="flex items-center justify-between mb-2 px-2">
                                <div></div>
                                <small className="text-end">
                                    <HiTrash
                                        className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                        onClick={() => setShowModal(true)} title={'Delete ping group'}/>
                                    <HiPencil
                                        className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                        onClick={event => window.location.href = route('ping-group.edit', pingGroup.id)}
                                        title={'Edit ping group'}/>
                                    <HiPlay
                                        className="md:ml-3 ml-1 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                        onClick={submit} title={'Run ping group'}/>
                                </small>
                            </div>
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
                                            data: (row) => row.from_server.hostname,
                                        },
                                        {
                                            id: "server_id",
                                            name: "To",
                                            sort: true,
                                            data: (row) => row.to_server.hostname,
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
            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Ping group?
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
