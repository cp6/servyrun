import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiDownload} from "react-icons/hi";
import CreatedAtText from "@/Components/CreatedAtText";
import BackButton from "@/Components/BackButton";
import DeleteButton from "@/Components/DeleteButton";
import IndigoButton from "@/Components/IndigoButton";

export default function Show({auth, resource, alert_type, alert_message}) {

    const [showModal, setShowModal] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('key.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"Key " + resource.original_name}</h2>}>
            <Head title={"Key " + resource.id}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('key.index')}>Back to keys</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-6 px-2 mx-auto max-w-6xl lg:py-10">
                        <div className={'grid grid-cols-2'}>
                            <div className={'md:col-span-1 col-span-2'}>
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-4">{resource.password === null ? ("NO password") : ("Password")}</span>
                                <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.original_name}</h2>
                                <p className="mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300">
                                    {
                                        (typeof (resource.conn[0]) != "undefined" && resource.conn[0] !== null)
                                            ? resource.conn[0].server.hostname
                                            : null
                                    }
                                </p>
                                <p className="mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300">{resource.file_id}</p>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                                <div className="flex items-center space-x-4">
                                    <DeleteButton onClick={() => setShowModal(true)}>Delete key</DeleteButton>
                                    <IndigoButton href={route('key.download', resource.id)}><HiDownload
                                        className="mr-2 h-5 w-5"/>Download key</IndigoButton>
                                </div>
                            </div>
                            <div className={'md:col-span-1 col-span-2 pl-4'}>
                                {
                                    (() => {
                                        if (resource.conn.length > 0) {
                                            return (
                                                <div className="mt-2">
                                                    <h2 className={'text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200'}>Servers
                                                        using this key</h2>
                                                    <ul class="list-disc">
                                                        {resource.conn.map(server =>
                                                            <li key={server.server.id}
                                                                className={'text-gray-800 dark:text-gray-300'}><a
                                                                href={route('server.show', server.server.id)}>{server.server.hostname} ({server.server.title})</a>
                                                            </li>)}
                                                    </ul>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <h2 className={'text-md ml-2 my-4 font-semibold leading-none text-gray-800 md:text-lg dark:text-gray-300'}>There
                                                    are no
                                                    servers in this group</h2>);
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Key?
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
