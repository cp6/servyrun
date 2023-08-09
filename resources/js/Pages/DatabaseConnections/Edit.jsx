import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import React from "react";
import UpdateButton from "@/Components/UpdateButton";
import BackButton from "@/Components/BackButton";
import ResponseAlert from "@/Components/Alert";

export default function Edit({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;

    const {data, setData, patch, processing, errors} = useForm({
        host: resource.host,
        title: resource.title,
        port: resource.port,
        username: resource.username,
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('db.connection.update', resource.id));
        navigate(route('db.connection.show', resource.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit
                DB connection</h2>}
        >
            <Head title="Edit DB connection"/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('db.connection.show', resource.id)}>Back to DB connection</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                <form onSubmit={submit}>
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                        <div className="sm:col-span-1 col-span-4">
                            <InputLabel forInput="title" value="Title"/>
                            <TextInput
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                handleChange={(e) => setData('title', e.target.value)}
                                maxLength={64}
                                required
                            />
                            <InputError message={errors.title} className="mt-2"/>
                        </div>
                        <div className="sm:col-span-1 col-span-4">
                            <InputLabel forInput="host" value="Host"/>
                            <TextInput
                                name="host"
                                value={data.host}
                                className="mt-1 block w-full"
                                autoComplete="host"
                                handleChange={(e) => setData('host', e.target.value)}
                                maxLength={64}
                                required
                            />
                            <InputError message={errors.host} className="mt-2"/>
                        </div>
                        <div className="sm:col-span-1 col-span-4">
                            <InputLabel forInput="username" value="Username"/>
                            <TextInput
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                handleChange={(e) => setData('username', e.target.value)}
                                maxLength={64}
                                required
                            />
                            <InputError message={errors.username} className="mt-2"/>
                        </div>
                        <div className="sm:col-span-1 col-span-4">
                            <InputLabel forInput="port" value="Port"/>
                            <TextInput
                                type='number'
                                name="port"
                                className="mt-1 block w-full"
                                autoComplete="port"
                                value={data.port}
                                handleChange={(e) => setData('port', e.target.value)}
                                required
                            />
                            <InputError message={errors.port} className="mt-2"/>
                        </div>
                        <div className='mt-2 sm:col-span-4 col-span-4'>
                            <p className='text-gray-500 dark:text-gray-400'>Passwords are stored encrypted</p>
                            <p className='text-yellow-500 dark:text-yellow-400'>You cannot edit the existing password, it must be re-set</p>
                        </div>
                        <div className="md:col-span-2 col-span-4">
                            <InputLabel forInput="password" value="Password"/>
                            <TextInput
                                name="password"
                                className="mt-1 block w-full"
                                autoComplete="password"
                                value={data.password}
                                handleChange={(e) => setData('password', e.target.value)}
                                required={true}
                            />
                            <InputError message={errors.password} className="mt-2"/>
                        </div>
                    </div>
                    <UpdateButton processing={processing}>Update DB connection</UpdateButton>
                </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
