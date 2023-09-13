import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import DangerButton from "@/Components/DangerButton";
import UpdateButton from "@/Components/UpdateButton";
import BackButton from "@/Components/BackButton";

export default function Edit({auth}) {

    const resource = usePage().props.resource;

    const [showModal, setShowModal] = useState(false);

    const {data, setData, patch, processing, errors} = useForm({
        title: resource.title,
        command: resource.command,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('command.update', resource.id));
    };

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('command.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit
                Command</h2>}
        >
            <Head title="Edit command"/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('command.index')}>Back to commands</BackButton>
                </div>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                        <div className='col-span-4'>
                            <InputLabel forInput="title" value="Title"/>
                            <TextInput
                                name="title"
                                value={data.title || ''}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                handleChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2"/>
                        </div>
                        <div className='col-span-4'>
                            <InputLabel forInput="command" value="Command"/>
                            <TextInput
                                name="command"
                                className="mt-1 block w-full"
                                autoComplete="command"
                                value={data.command || ''}
                                handleChange={(e) => setData('command', e.target.value)}
                                required
                            />
                            <InputError message={errors.asn} className="mt-2"/>
                        </div>
                    </div>
                    <UpdateButton processing={processing}>Update command</UpdateButton>
                    <DangerButton onClick={() => setShowModal(true)} type="button"
                                  className="inline-flex items-center mb-4 px-5 py-2.5 ml-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                        Delete command
                    </DangerButton>
                </form>
                </div>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this command?
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
