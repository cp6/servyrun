import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiLightningBolt} from "react-icons/hi";
import {HiMagnifyingGlass} from "react-icons/all";
import BackButton from "@/Components/BackButton";
import DeleteButton from "@/Components/DeleteButton";
import TealButton from "@/Components/TealButton";
import IndigoButton from "@/Components/IndigoButton";

export default function Show({auth, resource, alert_type, alert_message}) {
    const user = usePage().props.auth.user;

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
                <section className="bg-white/50 dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="py-4 px-2 md:px-6 max-w-4xl md:py-8">
                        <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.name}</h2>
                        <p className="mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300">{resource.conn.host} ({resource.conn.title})</p>
                        <div className="flex space-x-1 md:space-x-4">
                            <DeleteButton onClick={() => setShowModal(true)}>Delete Database</DeleteButton>
                            <TealButton href={route('db.show.tables', resource.id)}><HiMagnifyingGlass className="mr-2 h-5 w-5" />View tables</TealButton>
                            <IndigoButton href={route('db.connection.show', resource.db_connection_id)}><HiLightningBolt className="mr-2 h-5 w-5" />View connection</IndigoButton>
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
