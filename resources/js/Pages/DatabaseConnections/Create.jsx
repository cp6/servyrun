import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select, Button} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import {HiOutlineArrowLeft} from "react-icons/hi";
import axios from "axios";

export default function Create({auth, title, alert_type, alert_message, servers}) {

    const {data, setData, post, processing, reset, errors} = useForm({
        title: title,
        server_id: '',
        address: '',
        port: '3306',
        username: 'root',
        password: ''
    });

    const [hasAlert, setHasAlert] = React.useState(true);

    const user = usePage().props.auth.user;

    const submit = (e) => {
        e.preventDefault();

        post(route('db.connection.store'));
        navigate(route('db.connection.index'));
    };

    const fetchIp = event => {

        const config = {
            headers: { Authorization: `Bearer ${user.api_token}` }
        };

        if (event.target.value !== '') {
            axios.get(route('server.ip', event.target.value),  config).then(response => {
                setData(data => ({ ...data, address: response.data.ip}));
                setData(data => ({ ...data, server_id:  event.target.value}));
            }).catch(err => {
                console.log('Error fetching IP');
            });
        }
        setData('server_id', event.target.value);

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                DB connection</h2>}
        >
            <Head title="Create DB connection"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="xs" href={route('db.connection.index')}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                        Back to DB connections
                    </Button>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">
                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server_id" value="Server"/>
                                </div>
                                <Select onChange={fetchIp}
                                        name="server_id"
                                        value={data.server_id}
                                        handleChange={(e) => setData('server_id', e.target.value)}
                                >
                                    <option value=''>Choose to fill address</option>
                                    {servers.map(servers => <option key={servers.id}
                                        value={servers.id}>{servers.title} ({servers.hostname})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="address" value="Address/hostname"/>
                                <TextInput
                                    name="address"
                                    className="mt-1 block w-full"
                                    autoComplete="address"
                                    value={data.address}
                                    handleChange={(e) => setData('address', e.target.value)}
                                    maxLength={64}
                                    required
                                />
                                <InputError message={errors.address} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="title" value="Title"/>
                                <TextInput
                                    name="title"
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    value={data.title}
                                    handleChange={(e) => setData('title', e.target.value)}
                                    maxLength={64}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-1">
                                <InputLabel forInput="port" value="Port"/>
                                <TextInput
                                    type="number"
                                    name="port"
                                    className="mt-1 block w-full"
                                    autoComplete="port"
                                    value={data.port}
                                    handleChange={(e) => setData('port', e.target.value)}
                                />
                                <InputError message={errors.port} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-3">
                                <InputLabel forInput="username" value="Username"/>
                                <TextInput
                                    name="username"
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    value={data.username}
                                    handleChange={(e) => setData('username', e.target.value)}
                                    required
                                />
                                <InputError message={errors.username} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="password" value="Password"/>
                                <TextInput
                                    name="password"
                                    className="mt-1 block w-full"
                                    autoComplete="password"
                                    value={data.password}
                                    handleChange={(e) => setData('password', e.target.value)}
                                    maxLength={125}
                                />
                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create DB connection
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
