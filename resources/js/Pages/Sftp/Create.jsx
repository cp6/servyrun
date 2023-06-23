import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import axios from "axios";
import BackButton from "@/Components/BackButton";

export default function Create({auth}) {

    const servers = usePage().props.servers;
    const connections = usePage().props.connections;
    const keys = usePage().props.keys;

    const {data, setData, post, processing, reset, errors} = useForm({
        server_id: '',
        connection_id: '',
        username: 'root',
        port: '22',
        key_id: '',
        password: ''
    });

    const user = usePage().props.auth.user;
    const alert = usePage().props.alert;

    const [inputsDisabled, setInputsDisabled] = React.useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('sftp.store'));
        navigate(route('sftp.index'));
    };

    const getConnectionDetails = event => {

        setData(data => ({...data, connection_id: event.target.value}));

        if (event.target.value !== '') {
            setInputsDisabled(true);
        } else {
            setInputsDisabled(false);
        }

        const config = {
            headers: {Authorization: `Bearer ${user.api_token}`}
        };

        if (event.target.value !== '') {
            axios.get(route('api.connection.show', event.target.value), config).then(response => {
                setData(data => ({...data, server_id: response.data.server_id}));
            }).catch(err => {
                console.log('Error fetching connection details');
            });
        }

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                SFTP connection</h2>}
        >
            <Head title="Create SFTP connection"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('sftp.index')}>Back to SFTP connections</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server_id" value="Server"/>
                                </div>
                                <Select onChange={(e) => setData('server_id', e.target.value)}
                                        name="server_id"
                                        required={true}
                                        value={data.server_id}
                                        handleChange={(e) => setData('server_id', e.target.value)}
                                        disabled={inputsDisabled}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option
                                        value={servers.id}>{servers.title} ({servers.hostname})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection_id" value="Use this connection"/>
                                </div>
                                <Select onChange={getConnectionDetails}
                                        name="connection_id"
                                        value={data.connection_id}
                                        handleChange={(e) => setData('connection_id', e.target.value)}
                                >
                                    <option value=''>None (fill in the details below)</option>
                                    {connections.map(connections => <option
                                        value={connections.id}>{connections.username}@{connections.server.hostname}:{connections.ssh_port} {connections.key_id === null ? 'Password' : 'Key'}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="username" value="Username"/>
                                <TextInput
                                    id="username"
                                    name="username"
                                    value={data.username}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    handleChange={(e) => setData('username', e.target.value)}
                                    maxLength={64}
                                    disabled={inputsDisabled}
                                />
                                <InputError message={errors.username} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="port" value="Port"/>
                                <TextInput
                                    type='number'
                                    name="port"
                                    className="mt-1 block w-full"
                                    autoComplete="port"
                                    value={data.port}
                                    handleChange={(e) => setData('port', e.target.value)}
                                    disabled={inputsDisabled}
                                />
                                <InputError message={errors.port} className="mt-2"/>
                            </div>
                            <p><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  href={route('key.index')}>Manage keys</a></p>
                            <div className="sm:col-span-4 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="key_id" value="Key"/>
                                </div>
                                <Select onChange={(e) => setData('key_id', e.target.value)}
                                        name="key_id"
                                        value={data.key_id}
                                        handleChange={(e) => setData('key_id', e.target.value)}
                                        disabled={inputsDisabled}
                                >
                                    <option value=''>None. Use password</option>
                                    {keys.map(keys => <option key={keys.id}
                                                              value={keys.id}>{keys.original_name}</option>)}
                                </Select>
                            </div>
                            <div className='mt-2 sm:col-span-4 col-span-4'>
                                <p className='text-gray-500 dark:text-gray-400'>Passwords are stored encrypted</p>
                            </div>
                            <div className="col-span-4">
                                <InputLabel forInput="password" value="Password"/>
                                <TextInput
                                    name="password"
                                    className="mt-1 block w-full"
                                    autoComplete="password"
                                    value={data.password}
                                    handleChange={(e) => setData('password', e.target.value)}
                                    disabled={inputsDisabled}
                                />
                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create SFTP Connection
                        </PrimaryButton>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
