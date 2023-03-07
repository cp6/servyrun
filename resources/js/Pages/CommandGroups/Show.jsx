import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import CreatedAtText from "@/Components/CreatedAtText";
import BackButton from "@/Components/BackButton";
import {HiPencil, HiPlay, HiTrash} from "react-icons/hi";
import axios from "axios";
import UpdatedAtText from "@/Components/UpdatedAtText";

export default function Show({auth}) {

    const user = usePage().props.auth.user;
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

        fetch(route('command-group.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    const runGroup = () => {

        axios.get(route('command-group.run', resource.id)).then(response => {

        }).catch(err => {
            console.log('Error running this command group');
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"Command group: " + resource.title}</h2>}>
            <Head title={"Command group " + resource.id}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('command-group.index')}>Back to command groups</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between mb-2">
                                <h2 className="mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.title}</h2>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete command group'}/>
                                <HiPencil
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('command-group.edit', resource.id)}
                                    title={'Edit command group'}/>
                                <HiPlay
                                    className="md:ml-3 ml-1 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={runGroup} title={'Run command group'}/>
                            </small>
                        </div>
                        <div className={'grid grid-cols-2'}>
                        <div className={'md:col-span-1 col-span-2'}>
                            <code
                                className={'text-red-500 bg-gray-300 dark:bg-black p-1 rounded-md my-2'}>{resource.the_command.command}</code>
                            {(resource.email_output) ? <p className="my-2 text-md text-gray-900 dark:text-white">Emails
                                to {user.email}</p> : null}
                        </div>
                        <div className={'md:col-span-1 col-span-2'}>
                            {
                                (() => {
                                    if (resource.assigned.length > 0) {
                                        return (
                                            <div className="mt-2">
                                                <h2 className={'text-md font-bold mb-2 text-gray-800 md:text-lg dark:text-gray-200'}>Servers in group</h2>
                                                <ul className="list-disc">
                                                    {resource.assigned.map(server =>
                                                        <li key={server.server.id} className={'text-gray-800 dark:text-gray-300'}><a
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
                            Are you sure you want to delete this Command group?
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
