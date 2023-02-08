import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import CreatedAtText from "@/Components/CreatedAtText";
import BackButton from "@/Components/BackButton";
import DeleteButton from "@/Components/DeleteButton";
import EditButton from "@/Components/EditButton";
import {HiPlay} from "react-icons/hi";
import axios from "axios";
import EmeraldButton from "@/Components/EmeraldButton";

export default function Show({auth, resource, alert_type, alert_message}) {
    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

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
        setButtonsDisabled(true);

        axios.get(route('command-group.run', resource.id)).then(response => {
            setButtonsDisabled(false);
        }).catch(err => {
            console.log('Error running this command group');
            setButtonsDisabled(false);
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
                    <EditButton href={route('command-group.edit', resource.id)}>Edit/Add servers</EditButton>
                    <EmeraldButton onClick={runGroup} disabled={buttonsDisabled}><HiPlay
                        className="mr-2 h-5 w-5"/>Run</EmeraldButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="py-4 px-2 md:px-6 max-w-6xl md:py-8 grid grid-cols-2">
                        <div className={'md:col-span-1 col-span-2'}>
                            <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.title}</h2>
                            <code
                                className={'text-red-500 bg-gray-300 dark:bg-black p-1 rounded-md'}>{resource.the_command.command}</code>
                            {(resource.email_output) ? <p className="my-2 text-md text-gray-900 dark:text-white">Emails
                                to {user.email}</p> : null}
                            <CreatedAtText created_at={resource.created_at}
                                           string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                            <div className="flex items-center space-x-4">
                                <DeleteButton onClick={() => setShowModal(true)}>Delete command group</DeleteButton>
                            </div>
                        </div>
                        <div className={'md:col-span-1 col-span-2'}>
                            {
                                (() => {
                                    if (resource.assigned.length > 0) {
                                        return (
                                            <div className="mt-2">
                                                <h2 className={'text-md font-bold mb-2 text-gray-800 md:text-lg dark:text-gray-200'}>Servers in group</h2>
                                                <ul class="list-disc">
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
