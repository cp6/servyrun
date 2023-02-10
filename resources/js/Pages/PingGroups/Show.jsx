import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import React, {useState} from "react";
import {Button, Modal} from "flowbite-react";
import {Grid} from "gridjs-react";
import ResponseAlert from "@/Components/Alert";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import {HiOutlineArrowLeft, HiPlay, HiTrash} from "react-icons/hi";
import IndigoButton from "@/Components/IndigoButton";
import DeleteButton from "@/Components/DeleteButton";
import EmeraldButton from "@/Components/EmeraldButton";
import EditButton from "@/Components/EditButton";

export default function Show({auth, pingGroup, pings, hasAlert, alert_type, alert_message}) {

    const user = usePage().props.auth.user;

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const {post} = useForm({});

    const submit = (e) => {
        setButtonDisabled(true);
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
                        <IndigoButton href={route('ping.index')}><HiOutlineArrowLeft className="mr-2 h-5 w-5" />All pings</IndigoButton>
                        <form onSubmit={submit}>
                            <EmeraldButton onClick={submit} disabled={buttonDisabled}><HiPlay className="mr-2 h-5 w-5" />Run this ping group</EmeraldButton>
                        </form>
                        <DeleteButton onClick={() => setShowModal(true)}>Delete group</DeleteButton>
                        <EditButton href={route('ping-group.edit', pingGroup.id)}>Edit group</EditButton>
                    </div>
                    <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                                   alert_message={alert_message}></ResponseAlert>
                    <div className="px-1 mx-auto max-w-7xl">
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
