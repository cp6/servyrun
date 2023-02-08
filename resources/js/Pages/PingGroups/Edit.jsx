import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import BackButton from "@/Components/BackButton";

export default function Edit({auth, servers, resource}) {

    const {data, setData, patch, processing, errors} = useForm({
        server1_id: (typeof resource.assigned[0] !== 'undefined') ? resource.assigned[0].server_id : null,
        server2_id: (typeof resource.assigned[1] !== 'undefined') ? resource.assigned[1].server_id : null,
        server3_id: (typeof resource.assigned[2] !== 'undefined') ? resource.assigned[2].server_id : null,
        server4_id: (typeof resource.assigned[3] !== 'undefined') ? resource.assigned[3].server_id : null,
        server5_id: (typeof resource.assigned[4] !== 'undefined') ? resource.assigned[4].server_id : null,
        server6_id: (typeof resource.assigned[5] !== 'undefined') ? resource.assigned[5].server_id : null,
        server7_id: (typeof resource.assigned[6] !== 'undefined') ? resource.assigned[6].server_id : null,
        server8_id: (typeof resource.assigned[7] !== 'undefined') ? resource.assigned[7].server_id : null,
        title: resource.title
    });

    const user = usePage().props.auth.user;

    const submit = (e) => {
        e.preventDefault();

        patch(route('ping-group.update', resource.id));
        navigate(route('ping-group.index'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit ping
                group</h2>}
        >
            <Head title="Edit ping group"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('ping-group.index')}>Back to ping groups</BackButton>
                </div>
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
                        <div className="sm:col-span-2 col-span-6">
                            <div className="mb-2 block">
                                <InputLabel forInput="server1_id" value="Server 1"/>
                            </div>
                            <Select onChange={(e) => setData('server1_id', e.target.value)}
                                    name="server1_id"
                                    required={true}
                                    value={data.server1_id}
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
                        Edit group
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
