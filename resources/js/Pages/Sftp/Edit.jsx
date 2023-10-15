import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import UpdateButton from "@/Components/UpdateButton";
import BackButton from "@/Components/BackButton";
import ResponseAlert from "@/Components/Alert";

export default function Edit({auth}) {

    const servers = usePage().props.servers;
    const keys = usePage().props.keys;
    const resource = usePage().props.resource;
    const ip = usePage().props.ip;
    const alert = usePage().props.alert;

    const {data, setData, patch, processing, errors} = useForm({
        server_id: resource.server_id,
        username: resource.username,
        ssh_port: resource.port,
        key_id: resource.key_id,
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('sftp.update', resource.id));
        navigate(route('sftp.show', resource.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit SFTP connection</h2>}
        >
            <Head title="Edit SFTP connection"/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('sftp.show', resource.id)}>Back to STP connection</BackButton>
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
                            >
                                <option value=''>Choose one</option>
                                {servers.map(servers => <option key={servers.id}
                                    value={servers.id}>{servers.title} ({servers.hostname} | {ip})</option>)}
                            </Select>
                        </div>
                        <div className="sm:col-span-1 col-span-4">
                            <InputLabel forInput="username" value="Username"/>
                            <TextInput
                                id="username"
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
                            <InputLabel forInput="ssh_port" value="SSH port"/>
                            <TextInput
                                type='number'
                                name="ssh_port"
                                className="mt-1 block w-full"
                                autoComplete="ssh_port"
                                value={data.ssh_port}
                                handleChange={(e) => setData('ssh_port', e.target.value)}
                                required
                            />
                            <InputError message={errors.ssh_port} className="mt-2"/>
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
                            >
                                <option value=''>None. Use password</option>
                                {keys.map(keys => <option key={keys.id}
                                                          value={keys.id}>{keys.original_name}</option>)}
                            </Select>
                        </div>
                        <div className='mt-2 sm:col-span-4 col-span-4'>
                            <p className='text-gray-500 dark:text-gray-400'>Passwords are stored encrypted</p>
                            <p className='text-yellow-500 dark:text-yellow-400'>You cannot edit the existing password, it must be re-set</p>
                        </div>
                        <div className="col-span-4">
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
                    <UpdateButton processing={processing}>Update SFTP connection</UpdateButton>
                </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
