import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import UpdateButton from "@/Components/UpdateButton";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";

export default function Edit({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;
    const types = usePage().props.types;
    const locations = usePage().props.locations;

    const {data, setData, patch, processing, errors} = useForm({
        title: resource.title,
        hostname: resource.hostname,
        server_type: resource.type_id,
        location: resource.location_id,
        ip: (resource.ip_ssh !== null) ? resource.ip_ssh.ip : '',
        os: resource.operating_system,
        cpu: resource.cpu,
        cpu_cores: resource.cpu_cores,
        cpu_freq: resource.cpu_freq,
        disk_gb: resource.disk_gb,
        ram_mb: resource.ram_mb,
        swap_mb: resource.swap_mb,
        ping_port: resource.ping_port,
        price: resource.price,
        term: resource.payment_term,
        currency: resource.currency,
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
                    <BackButton href={route('server.show', resource.id)}>Back to server</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
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
                                    value={data.ip}
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
                            <div className="sm:col-span-1 col-span-4">
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
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="price" value="Price"/>
                                <TextInput
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    className="mt-1 block w-full"
                                    autoComplete="Price"
                                    value={data.price || ''}
                                    handleChange={(e) => setData('price', e.target.value)}
                                />
                                <InputError message={errors.price} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="currency" value="Currency"/>
                                <Select onChange={(e) => setData('currency', e.target.value)}
                                        name="currency"
                                        value={data.currency || ''}
                                >
                                    <option value=''>Choose</option>
                                    <option key={1} value={'AUD'}>AUD</option>
                                    <option key={2} value={'CAD'}>CAD</option>
                                    <option key={3} value={'CHF'}>CHF</option>
                                    <option key={4} value={'CNY'}>CNY</option>
                                    <option key={5} value={'EUR'}>EUR</option>
                                    <option key={6} value={'GBP'}>GBP</option>
                                    <option key={7} value={'HKD'}>HKD</option>
                                    <option key={8} value={'INR'}>INR</option>
                                    <option key={9} value={'JPY'}>JPY</option>
                                    <option key={10} value={'NZD'}>NZD</option>
                                    <option key={11} value={'SGD'}>SGD</option>
                                    <option key={12} value={'TWD'}>TWD</option>
                                    <option key={13} value={'USD'}>USD</option>
                                </Select>
                                <InputError message={errors.currency} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <InputLabel forInput="term" value="Term"/>
                                <Select onChange={(e) => setData('term', e.target.value)}
                                        name="term"
                                        value={data.term || ''}
                                >
                                    <option value=''>Choose</option>
                                    <option key={1} value={1}>Weekly</option>
                                    <option key={2} value={2}>Monthly</option>
                                    <option key={3} value={3}>Quarterly</option>
                                    <option key={4} value={4}>Semi annual</option>
                                    <option key={5} value={5}>Annual</option>
                                    <option key={6} value={6}>Bi Annual</option>
                                    <option key={7} value={7}>Tri Annual</option>
                                </Select>
                                <InputError message={errors.term} className="mt-2"/>
                            </div>
                        </div>
                        <UpdateButton processing={processing}>Update server</UpdateButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
