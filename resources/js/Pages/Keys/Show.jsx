import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiDownload, HiTrash} from "react-icons/hi";
import CreatedAtText from "@/Components/CreatedAtText";
import BackButton from "@/Components/BackButton";

export default function Show({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;

    const [showModal, setShowModal] = useState(false);

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
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('key.index')}>Back to keys</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between">
                     <span
                         className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{resource.password === null ? ("No password") : ("Has password")}</span>
                            <small className="text-sm text-gray-700">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete key'}/>
                                <HiDownload className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                            onClick={event => window.location.href = route('key.download', resource.id)} title={'Download key'}/>
                            </small>
                        </div>
                        <div className={'grid grid-cols-2'}>
                            <div className={'md:col-span-1 col-span-2'}>
                                <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.original_name}</h2>
                                <p className="mb-4 text-lg font-bold leading-none text-gray-600 md:text-lg dark:text-gray-400">{resource.file_id}</p>
                            </div>
                            <div className={'md:col-span-1 col-span-2 pl-4'}>
                                {
                                    (() => {
                                        if (resource.conn.length > 0) {
                                            return (
                                                <div className="mt-2">
                                                    <h2 className={'text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200'}>Servers
                                                        using this key ({resource.conn.length})</h2>
                                                    <ul className="list-disc">
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
                        <div className={'grid md:grid-cols-2 grid-cols-1'}>
                            <div className={'col-span-1'}>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                            </div>
                            <div className={'col-span-1'}></div>
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
