import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select, Button} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import {HiOutlineArrowLeft} from "react-icons/hi";

export default function Edit({auth, types, locations, resource}) {

    const user = usePage().props.auth.user;

    const {data, setData, patch, processing, errors} = useForm({
        title: resource.title,
        hostname: resource.hostname,
        server_type: resource.type_id,
        location: resource.location_id,
        ip: resource.ip_ssh.ip,
        os: resource.operating_system,
        cpu: resource.cpu,
        cpu_cores: resource.cpu_cores,
        cpu_freq: resource.cpu_freq,
        disk_gb: resource.disk_gb,
        ram_mb: resource.ram_mb,
        swap_mb: resource.swap_mb,
        ping_port: resource.ping_port,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('server.update', resource.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit
                server</h2>}
        >
            <Head title="Edit server"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="xs" href={route('server.index')}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                        Back to servers
                    </Button>
                </div>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">
                            <div className="sm:col-span-3 col-span-4">
                                <InputLabel forInput="hostname" value="Hostname"/>
                                <TextInput
                                    name="hostname"
                                    value={data.hostname || ''}
                                    className="mt-1 block w-full"
                                    autoComplete="hostname"
                                    handleChange={(e) => setData('hostname', e.target.value)}
                                    required
                                />
                                <InputError message={errors.hostname} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-3 col-span-4">
                                <InputLabel forInput="title" value="Title"/>
                                <TextInput
                                    name="title"
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    value={data.title || ''}
                                    handleChange={(e) => setData('title', e.target.value)}
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
                                        value={resource.type_id}
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
                                        value={resource.location.id}
                                >
                                    <option value=''>Choose</option>
                                    {locations.map(locations => <option key={locations.id}
                                                                        value={locations.id}>{locations.name}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="ip" value="IP address"/>
                                <TextInput
                                    name="ip"
                                    className="mt-1 block w-full"
                                    autoComplete="ip"
                                    value={resource.ip_ssh.ip || ''}
                                    handleChange={(e) => setData('ip', e.target.value)}
                                    required
                                />
                                <InputError message={errors.ip} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="ping_port" value="Ping port"/>
                                <TextInput
                                    type="number"
                                    name="ping_port"
                                    className="mt-1 block w-full"
                                    autoComplete="ping_port"
                                    value={data.ping_port || ''}
                                    handleChange={(e) => setData('ping_port', e.target.value)}
                                />
                                <InputError message={errors.ping_port} className="mt-2"/>
                            </div>
                            <div className='col-span-6 text-center mt-2'>
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
                                    value={data.os || ''}
                                    handleChange={(e) => setData('os', e.target.value)}
                                />
                                <InputError message={errors.os} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="cpu" value="CPU"/>
                                <TextInput
                                    name="cpu"
                                    className="mt-1 block w-full"
                                    autoComplete="cpu"
                                    value={data.cpu || ''}
                                    handleChange={(e) => setData('cpu', e.target.value)}
                                />
                                <InputError message={errors.cpu} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="cpu_cores" value="Cores"/>
                                <TextInput
                                    type="number"
                                    name="cpu_cores"
                                    className="mt-1 block w-full"
                                    autoComplete="cpu_cores"
                                    value={data.cpu_cores || ''}
                                    handleChange={(e) => setData('cpu_cores', e.target.value)}
                                />
                                <InputError message={errors.cpu_cores} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="cpu_freq" value="Freq"/>
                                <TextInput
                                    type="number"
                                    step="0.01"
                                    name="cpu_freq"
                                    className="mt-1 block w-full"
                                    autoComplete="cpu_freq"
                                    value={data.cpu_freq || ''}
                                    handleChange={(e) => setData('cpu_freq', e.target.value)}
                                />
                                <InputError message={errors.cpu_freq} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="disk_gb" value="Disk GB"/>
                                <TextInput
                                    type="number"
                                    name="disk_gb"
                                    className="mt-1 block w-full"
                                    autoComplete="disk_gb"
                                    value={data.disk_gb || ''}
                                    handleChange={(e) => setData('disk_gb', e.target.value)}
                                />
                                <InputError message={errors.disk_gb} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="ram_mb" value="RAM MB"/>
                                <TextInput
                                    type="number"
                                    step="1"
                                    name="ram_mb"
                                    className="mt-1 block w-full"
                                    autoComplete="ram_mb"
                                    value={data.ram_mb || ''}
                                    handleChange={(e) => setData('ram_mb', e.target.value)}
                                />
                                <InputError message={errors.ram_mb} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="swap_mb" value="SWAP MB"/>
                                <TextInput
                                    type="number"
                                    step="1"
                                    name="swap_mb"
                                    className="mt-1 block w-full"
                                    autoComplete="swap_mb"
                                    value={data.swap_mb || ''}
                                    handleChange={(e) => setData('swap_mb', e.target.value)}
                                />
                                <InputError message={errors.swap_mb} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Update Server
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
