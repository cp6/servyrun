import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Card, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import CreatedAtText from "@/Components/CreatedAtText";
import BackButton from "@/Components/BackButton";
import DeleteButton from "@/Components/DeleteButton";

export default function Show({auth, resource, alert_type, alert_message}) {
    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

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
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-900 rounded-lg shadow-sm">
                    <div className="py-6 px-2 mx-auto max-w-4xl lg:py-10">
                        <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.title}</h2>
                        <code className={'text-red-600 bg-gray-300 dark:bg-black p-1 rounded-md'}>{resource.the_command.command}</code>
                        <CreatedAtText created_at={resource.created_at}
                                       string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                        <div className="flex items-center space-x-4">
                            <DeleteButton onClick={() => setShowModal(true)}>Delete command group</DeleteButton>
                        </div>
                    </div>
                </section>
                {
                    (() => {
                        if (resource.assigned.length > 0) {
                            return (
                                <div className="mt-2 grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4">
                                    {resource.assigned.map(server => <Card key={server.server.id}
                                                                           href={route('server.show', server.server.id)}
                                                                           className={'dark:bg-gray-700 shadow-none'}>
                                        <div className="flex flex-col items-center pb-3">
                                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                {server.server.hostname}
                                            </h5>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
       {server.server.title}
      </span>
                                        </div>
                                    </Card>)}
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
