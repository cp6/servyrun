import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import BackButton from "@/Components/BackButton";
import ResponseAlert from "@/Components/Alert";

export default function Create({auth}) {

    const alert = usePage().props.alert;
    const connections = usePage().props.connections;

    const {data, setData, post, processing, reset, errors} = useForm({
        connection1_id: null,
        connection2_id: null,
        connection3_id: null,
        connection4_id: null,
        connection5_id: null,
        connection6_id: null,
        connection7_id: null,
        connection8_id: null,
        title: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('ping-group.store'));
        navigate(route('ping-group.index'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create a
                ping group</h2>}
        >
            <Head title="Create connection"/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('ping-group.index')}>Back to ping groups</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-6">
                            <div className="col-span-5 mb-3">
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
                            <div className="col-span-6">
                                <p className={'mb-2 text-yellow-400 dark:text-yellow-300'}>Only servers with a
                                    connection shown</p>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection1_id" value="Server 1"/>
                                </div>
                                <Select onChange={(e) => setData('connection1_id', e.target.value)}
                                        name="connection1_id"
                                        required={true}
                                        value={data.connection1_id}
                                        handleChange={(e) => setData('connection1_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection2_id" value="Server 2"/>
                                </div>
                                <Select onChange={(e) => setData('connection2_id', e.target.value)}
                                        name="connection2_id"
                                        required={true}
                                        value={data.connection2_id}
                                        handleChange={(e) => setData('connection2_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection3_id" value="Server 3"/>
                                </div>
                                <Select onChange={(e) => setData('connection3_id', e.target.value)}
                                        name="connection3_id"
                                        value={data.connection3_id}
                                        handleChange={(e) => setData('connection3_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection4_id" value="Server 4"/>
                                </div>
                                <Select onChange={(e) => setData('connection4_id', e.target.value)}
                                        name="connection4_id"
                                        value={data.connection4_id}
                                        handleChange={(e) => setData('connection4_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection5_id" value="Server 5"/>
                                </div>
                                <Select onChange={(e) => setData('connection5_id', e.target.value)}
                                        name="connection5_id"
                                        value={data.connection5_id}
                                        handleChange={(e) => setData('connection5_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection6_id" value="Server 6"/>
                                </div>
                                <Select onChange={(e) => setData('connection6_id', e.target.value)}
                                        name="connection6_id"
                                        value={data.connection6_id}
                                        handleChange={(e) => setData('connection6_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection7_id" value="Server 7"/>
                                </div>
                                <Select onChange={(e) => setData('connection7_id', e.target.value)}
                                        name="connection7_id"
                                        value={data.connection7_id}
                                        handleChange={(e) => setData('connection7_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection8_id" value="Server 8"/>
                                </div>
                                <Select onChange={(e) => setData('connection8_id', e.target.value)}
                                        name="connection8_id"
                                        value={data.connection8_id}
                                        handleChange={(e) => setData('connection8_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {connections.map(connection => <option key={connection.id}
                                                                           value={connection.id}>{connection.server.hostname} ({connection.server.title}) {connection.username} with {(connection.key_id === null) ? 'password' : 'key'}</option>)}
                                </Select>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create ping group
                        </PrimaryButton>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
