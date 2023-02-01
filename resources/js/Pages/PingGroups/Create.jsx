import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select, Button} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import {HiOutlineArrowLeft} from "react-icons/hi";

export default function Create({auth, servers, keys}) {

    const {data, setData, post, processing, reset, errors} = useForm({
        server1_id: null,
        server2_id: null,
        server3_id: null,
        server4_id: null,
        server5_id: null,
        server6_id: null,
        server7_id: null,
        server8_id: null,
        title: ''
    });

    const user = usePage().props.auth.user;

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
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="xs" href={route('ping-group.index')}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                        Back to ping groups
                    </Button>
                </div>
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
                            <p className={'mb-2 text-yellow-400 dark:text-yellow-300'}>Only servers with a connection shown</p>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server1_id" value="Server 1"/>
                                </div>
                                <Select onChange={(e) => setData('server1_id', e.target.value)}
                                        name="server1_id"
                                        required={true}
                                        value={data.server1_id}
                                        handleChange={(e) => setData('server1_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server2_id" value="Server 2"/>
                                </div>
                                <Select onChange={(e) => setData('server2_id', e.target.value)}
                                        name="server2_id"
                                        required={true}
                                        value={data.server2_id}
                                        handleChange={(e) => setData('server2_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server3_id" value="Server 3"/>
                                </div>
                                <Select onChange={(e) => setData('server3_id', e.target.value)}
                                        name="server3_id"
                                        value={data.server3_id}
                                        handleChange={(e) => setData('server3_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server4_id" value="Server 4"/>
                                </div>
                                <Select onChange={(e) => setData('server4_id', e.target.value)}
                                        name="server4_id"
                                        value={data.server4_id}
                                        handleChange={(e) => setData('server4_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server5_id" value="Server 5"/>
                                </div>
                                <Select onChange={(e) => setData('server5_id', e.target.value)}
                                        name="server5_id"
                                        value={data.server5_id}
                                        handleChange={(e) => setData('server5_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server6_id" value="Server 6"/>
                                </div>
                                <Select onChange={(e) => setData('server6_id', e.target.value)}
                                        name="server6_id"
                                        value={data.server6_id}
                                        handleChange={(e) => setData('server6_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server7_id" value="Server 7"/>
                                </div>
                                <Select onChange={(e) => setData('server7_id', e.target.value)}
                                        name="server7_id"
                                        value={data.server7_id}
                                        handleChange={(e) => setData('server7_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-6">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server8_id" value="Server 8"/>
                                </div>
                                <Select onChange={(e) => setData('server8_id', e.target.value)}
                                        name="server8_id"
                                        value={data.server8_id}
                                        handleChange={(e) => setData('server8_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
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
