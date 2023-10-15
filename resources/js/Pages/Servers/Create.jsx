import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select, Button} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";

export default function Create({auth, types, locations, title}) {

    const alert = usePage().props.alert;

    const {data, setData, post, processing, reset, errors} = useForm({
        title: title,
        hostname: '',
        server_type: '1',
        location: '',
        ip: '',
        os: '',
        cpu: '',
        cpu_cores: '',
        cpu_freq: '',
        disk_gb: '',
        disk_tb: '',
        ram_mb: '',
        ram_gb: '',
        swap: '',
        ping_port: '80'
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('server.store'));
        navigate(route('server.index'));
    };

    async function getIpFromHostname(dns_type = 'A') {
        const response = await fetch(route('domain-for-ip', [data.hostname, dns_type]), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.user.api_token,
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        return response.json();
    }

    const insertIpFromHostnameA = () => {
        if (data.hostname !== '') {
            const createOutput = getIpFromHostname('A').then((the_response) => {
                if (typeof (the_response.ip) != "undefined" && the_response.ip !== null) {
                    setData('ip', the_response.ip);
                    alert('NOTE: If this hostname is behind Cloudflare this IP may be wrong')
                }
            });
        }
    };

    const insertIpFromHostnameAAAA = () => {
        if (data.hostname !== '') {
            const createOutput = getIpFromHostname('AAAA').then((the_response) => {
                if (typeof (the_response.ip) != "undefined" && the_response.ip !== null) {
                    setData('ip', the_response.ip);
                    alert('NOTE: If this hostname is behind Cloudflare this IP may be wrong')
                }
            });
        }
    };

    const diskGbHandler = (e) => {
        setData(data => ({ ...data, disk_tb:  parseInt(e.target.value) / 1024}));
        setData(data => ({ ...data, disk_gb: e.target.value}));
    }

    const diskTbHandler = (e) => {
        setData(data => ({ ...data, disk_gb:  parseInt(e.target.value) * 1024}));
        setData(data => ({ ...data, disk_tb: e.target.value}));
    }

    const ramMbHandler = (e) => {
        setData(data => ({ ...data, ram_gb:  parseInt(e.target.value) / 1024}));
        setData(data => ({ ...data, ram_mb: e.target.value}));
    }

    const ramGbHandler = (e) => {
        setData(data => ({ ...data, ram_mb:  parseInt(e.target.value) * 1024}));
        setData(data => ({ ...data, ram_gb: e.target.value}));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                server</h2>}
        >
            <Head title="Create server"/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('server.index')}>Back to servers</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">
                            <div className="sm:col-span-3 col-span-4">
                                <InputLabel forInput="hostname" value="Hostname"/>
                                <TextInput
                                    name="hostname"
                                    value={data.hostname}
                                    className="mt-1 block w-full"
                                    autoComplete="hostname"
                                    handleChange={(e) => setData('hostname', e.target.value)}
                                    maxLength={64}
                                    required
                                />
                                <InputError message={errors.hostname} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel value="Auto fill IP"/>
                                <div className="flex items-center space-x-4">
                                    <Button color='light' size="xs" onClick={insertIpFromHostnameA} type="button">
                                        IPv4
                                    </Button>
                                    <Button color='light' size="xs" onClick={insertIpFromHostnameAAAA} type="button">
                                        Ipv6
                                    </Button>
                                </div>
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

                            <div className="sm:col-span-1 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server_type" value="Type"/>
                                </div>
                                <Select onChange={(e) => setData('server_type', e.target.value)}
                                        name="server_type"
                                        required={true}
                                        value={data.server_type}
                                >
                                    <option value=''>Choose</option>
                                    {types.map(types => <option key={types.id} value={types.id}>{types.name}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="location" value="Location"/>
                                </div>
                                <Select onChange={(e) => setData('location', e.target.value)}
                                        name="location"
                                        required={true}
                                        value={data.location}
                                >
                                    <option value=''>Choose</option>
                                    {locations.map(locations => <option key={locations.id}
                                                                        value={locations.id}>{locations.city} {locations.country}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-3">
                                <InputLabel forInput="ip" value="Main IP address"/>
                                <TextInput
                                    name="ip"
                                    className="mt-1 block w-full"
                                    autoComplete="ip"
                                    value={data.ip}
                                    handleChange={(e) => setData('ip', e.target.value)}
                                    required
                                />
                                <InputError message={errors.ip} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-1">
                                <InputLabel forInput="ping_port" value="Ping port"/>
                                <TextInput
                                    type="number"
                                    name="ping_port"
                                    className="mt-1 block w-full"
                                    autoComplete="ping_port"
                                    value={data.ping_port}
                                    handleChange={(e) => setData('ping_port', e.target.value)}
                                />
                                <InputError message={errors.ping_port} className="mt-2"/>
                            </div>
                            <div className='text-center mt-2 sm:col-span-6 col-span-4'>
                                <p className='text-gray-400 dark:text-gray-300'>The following can be auto filled with
                                    the
                                    server connection</p>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="os" value="Operating system"/>
                                <TextInput
                                    name="os"
                                    className="mt-1 block w-full"
                                    autoComplete="os"
                                    value={data.os}
                                    handleChange={(e) => setData('os', e.target.value)}
                                    maxLength={64}
                                />
                                <InputError message={errors.os} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-2">
                                <InputLabel forInput="cpu" value="CPU"/>
                                <TextInput
                                    name="cpu"
                                    className="mt-1 block w-full"
                                    autoComplete="cpu"
                                    value={data.cpu}
                                    handleChange={(e) => setData('cpu', e.target.value)}
                                />
                                <InputError message={errors.cpu} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="cpu_cores" value="CPU Cores"/>
                                <TextInput
                                    type="number"
                                    name="cpu_cores"
                                    className="mt-1 block w-full"
                                    autoComplete="cpu_cores"
                                    value={data.cpu_cores}
                                    handleChange={(e) => setData('cpu_cores', e.target.value)}
                                />
                                <InputError message={errors.cpu_cores} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="cpu_freq" value="CPU Freq"/>
                                <TextInput
                                    type="number"
                                    step="0.01"
                                    name="cpu_freq"
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                />
                                <InputError message={errors.cpu_freq} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="disk_gb" value="Disk GB"/>
                                <TextInput
                                    type="number"
                                    name="disk_gb"
                                    className="mt-1 block w-full"
                                    autoComplete="disk_gb"
                                    value={data.disk_gb}
                                    handleChange={diskGbHandler}
                                />
                                <InputError message={errors.disk_gb} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="disk_tb" value="Disk TB"/>
                                <TextInput
                                    type="number"
                                    name="disk_tb"
                                    className="mt-1 block w-full"
                                    autoComplete="disk_tb"
                                    value={data.disk_tb}
                                    handleChange={diskTbHandler}
                                />
                                <InputError message={errors.disk_tb} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="ram_mb" value="RAM MB"/>
                                <TextInput
                                    type="number"
                                    step="1"
                                    name="ram_mb"
                                    className="mt-1 block w-full"
                                    autoComplete="ram_mb"
                                    value={data.ram_mb}
                                    handleChange={ramMbHandler}
                                />
                                <InputError message={errors.ram_mb} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="ram_gb" value="RAM GB"/>
                                <TextInput
                                    type="number"
                                    step="1"
                                    name="ram_gb"
                                    className="mt-1 block w-full"
                                    autoComplete="ram_gb"
                                    value={data.ram_gb}
                                    handleChange={ramGbHandler}
                                />
                                <InputError message={errors.ram_gb} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="swap" value="SWAP MB"/>
                                <TextInput
                                    type="number"
                                    step="1"
                                    name="swap"
                                    className="mt-1 block w-full"
                                    autoComplete="swap"
                                    value={data.ram}
                                    handleChange={(e) => setData('swap', e.target.value)}
                                />
                                <InputError message={errors.swap} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create Server
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
