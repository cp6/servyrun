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

export default function Create({auth, types, locations, title, alert_type, alert_message}) {

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
        disk: '',
        ram: '',
        swap: '',
        ping_port: '80'
    });

    const [hasAlert, setHasAlert] = React.useState(true);

    const user = usePage().props.auth.user;

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
                }
            });
        }
    };

    const insertIpFromHostnameAAAA = () => {
        if (data.hostname !== '') {
            const createOutput = getIpFromHostname('AAAA').then((the_response) => {
                if (typeof (the_response.ip) != "undefined" && the_response.ip !== null) {
                    setData('ip', the_response.ip);
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                server</h2>}
        >
            <Head title="Create server"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="xs" href={route('server.index')}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5"/>
                        Back to servers
                    </Button>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
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
                                        handleChange={(e) => setData('server_type', e.target.value)}
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
                                        handleChange={(e) => setData('location', e.target.value)}
                                >
                                    <option value=''>Choose</option>
                                    {locations.map(locations => <option key={locations.id}
                                                                        value={locations.id}>{locations.name}</option>)}
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
                            <div className="sm:col-span-2 col-span-2">
                                <InputLabel forInput="disk" value="Disk GB"/>
                                <TextInput
                                    type="number"
                                    name="disk"
                                    className="mt-1 block w-full"
                                    autoComplete="disk"
                                    value={data.disk}
                                    handleChange={(e) => setData('disk', e.target.value)}
                                />
                                <InputError message={errors.disk} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-2">
                                <InputLabel forInput="ram" value="RAM MB"/>
                                <TextInput
                                    type="number"
                                    step="1"
                                    name="ram"
                                    className="mt-1 block w-full"
                                    autoComplete="ram"
                                    value={data.ram}
                                    handleChange={(e) => setData('ram', e.target.value)}
                                />
                                <InputError message={errors.ram} className="mt-2"/>
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
