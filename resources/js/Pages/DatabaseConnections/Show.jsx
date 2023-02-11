import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiHashtag} from "react-icons/hi";
import axios from "axios";
import BackButton from "@/Components/BackButton";
import TealButton from "@/Components/TealButton";
import DeleteButton from "@/Components/DeleteButton";

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

        fetch(route('db.connection.destroy', resource.id), requestOptions).then(response => {
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

    const getVersion = () => {
        axios.get(route('db.connection.version', resource.id)).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error getting version');
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"DB connections"}</h2>}>
            <Head title={"DB connection"}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('db.connection.index')}>Back to DB connections</BackButton>
                    <TealButton onClick={getVersion}><HiHashtag className="mr-2 h-5 w-5" />Get version</TealButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="py-4 px-2 md:px-6 max-w-4xl md:py-8">
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-4">{resource.type === 1 ? ("MySQL") : ("Other")}</span>
                        {resource.version !== null ?
                            <span
                                className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{resource.version}</span>
                            :
                        null}
                        <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.host}</h2>
                        <p className="mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300">{resource.title}</p>
                        <div className="flex space-x-1 md:space-x-4">
                            <DeleteButton onClick={() => setShowModal(true)}>Delete Connection</DeleteButton>
                            <button onClick={handleClick} type="button"
                                    className={
                                        (() => {
                                            if (isUp) {
                                                return (
                                                    "shrink items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
                                                )
                                            } else if (isUp === null) {
                                                return (
                                                    "shrink items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center border-gray-200 bg-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                )
                                            } else {
                                                return (
                                                    "shrink items-center text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                )
                                            }
                                        })()
                                    }>
                                {
                                    (() => {
                                        if (isUp) {
                                            return (
                                                <p>Successfully connected</p>
                                            )
                                        } else if (isUp === null) {
                                            return (
                                                <p>Check connection</p>
                                            )
                                        } else {
                                            return (
                                                <p>Cannot connect</p>
                                            )
                                        }
                                    })()
                                }
                            </button>
                        </div>
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
