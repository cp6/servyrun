import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiLightningBolt, HiTrash} from "react-icons/hi";
import {HiMagnifyingGlass} from "react-icons/all";
import BackButton from "@/Components/BackButton";
import CreatedAtText from "@/Components/CreatedAtText";
import UpdatedAtText from "@/Components/UpdatedAtText";

export default function Show({auth, resource, alert_type, alert_message}) {

    const [showModal, setShowModal] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    const [isUp, setIsUp] = useState(null);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('db.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    const handleClick = () => {
        axios.get(route('db.connection.connect', resource.id)).then(response => {
            setIsUp(response.data.result);
        }).catch(err => {
            setIsUp(!isUp);
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.name + " database"}</h2>}>
            <Head title={resource.name + " database"}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('db.index')}>Back to databases</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between">
                            <div></div>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete database'}/>
                                <HiMagnifyingGlass
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('db.show.tables', resource.id)}
                                    title={'View tables'}/>
                                <HiLightningBolt
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('db.connection.show', resource.db_connection_id)}
                                    title={'View connection'}/>
                            </small>
                        </div>
                        <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.name}</h2>
                        <p className="mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300">{resource.conn.host} ({resource.conn.title})</p>
                        <div className={'grid md:grid-cols-2 grid-cols-1'}>
                            <div className={'col-span-1'}>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                            </div>
                            <div className={'col-span-1'}>
                                <UpdatedAtText updated_at={resource.updated_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></UpdatedAtText>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this database?
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
