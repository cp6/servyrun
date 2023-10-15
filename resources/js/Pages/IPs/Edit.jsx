import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select, Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import UpdateButton from "@/Components/UpdateButton";
import BackButton from "@/Components/BackButton";
import DeleteButton from "@/Components/DeleteButton";
import ResponseAlert from "@/Components/Alert";
import TealButton from "@/Components/TealButton";
import {HiRefresh} from "react-icons/hi";
import axios from "axios";

export default function Edit({auth}) {

    const alert = usePage().props.alert;
    const servers = usePage().props.servers;
    const resource = usePage().props.resource;
    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const {data, setData, patch, processing, errors} = useForm({
        ip: resource.ip,
        asn: resource.asn,
        org: resource.org,
        isp: resource.isp,
        timezone_gmt: resource.timezone_gmt,
        country: resource.country,
        city: resource.city,
        continent: resource.continent,
        server_id: (resource.server_id) ? resource.server_id : '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('ip.update', resource.id));
        navigate(route('ip.show', resource.id));
    };

    const deleteItem = () => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('ip.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    const refreshData = () => {
        const header = {
            headers: {
                'Authorization': `Bearer ` + user.api_token
            }
        };

        setButtonsDisabled(true);

        axios.get(route('api.ips.geo', resource.id), header).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error fetching data');
            setButtonsDisabled(false);
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit
                IP address</h2>}
        >
            <Head title="Edit IP"/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('ip.show', resource.id)}>Back to IP</BackButton>
                    <TealButton onClick={refreshData} disabled={buttonsDisabled}><HiRefresh className="mr-2 h-5 w-5"/>Refresh
                        GEO IP</TealButton>
                    <DeleteButton onClick={() => setShowModal(true)}>Delete IP</DeleteButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                            <div className="col-span-2">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server_id" value="Server"/>
                                </div>
                                <Select onChange={(e) => setData('server_id', e.target.value)}
                                        name="server_id"
                                        required={true}
                                        value={data.server_id}

                                >
                                    <option value=''>Choose</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>

                            <div>
                                <InputLabel forInput="ip" value="IP"/>
                                <TextInput
                                    name="ip"
                                    value={data.ip || ''}
                                    className="mt-1 block w-full"
                                    autoComplete="ip"
                                    handleChange={(e) => setData('ip', e.target.value)}
                                    required
                                />
                                <InputError message={errors.ip} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel forInput="asn" value="asn"/>
                                <TextInput
                                    name="asn"
                                    className="mt-1 block w-full"
                                    autoComplete="asn"
                                    value={data.asn || ''}
                                    handleChange={(e) => setData('asn', e.target.value)}
                                />
                                <InputError message={errors.asn} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel forInput="org" value="org"/>
                                <TextInput
                                    name="org"
                                    className="mt-1 block w-full"
                                    autoComplete="org"
                                    value={data.org || ''}
                                    handleChange={(e) => setData('org', e.target.value)}
                                />
                                <InputError message={errors.org} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel forInput="isp" value="isp"/>
                                <TextInput
                                    name="isp"
                                    className="mt-1 block w-full"
                                    autoComplete="isp"
                                    value={data.isp || ''}
                                    handleChange={(e) => setData('isp', e.target.value)}
                                />
                                <InputError message={errors.isp} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel forInput="timezone_gmt" value="timezone_gmt"/>
                                <TextInput
                                    name="timezone_gmt"
                                    className="mt-1 block w-full"
                                    autoComplete="timezone_gmt"
                                    value={data.timezone_gmt || ''}
                                    handleChange={(e) => setData('timezone_gmt', e.target.value)}
                                />
                                <InputError message={errors.timezone_gmt} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel forInput="country" value="country"/>
                                <TextInput
                                    name="country"
                                    className="mt-1 block w-full"
                                    autoComplete="country"
                                    value={data.country || ''}
                                    handleChange={(e) => setData('country', e.target.value)}
                                />
                                <InputError message={errors.country} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel forInput="city" value="city"/>
                                <TextInput
                                    name="city"
                                    className="mt-1 block w-full"
                                    autoComplete="city"
                                    value={data.city || ''}
                                    handleChange={(e) => setData('city', e.target.value)}
                                />
                                <InputError message={errors.cpu_freq} className="mt-2"/>
                            </div>
                            <div>
                                <InputLabel forInput="continent" value="continent"/>
                                <TextInput
                                    name="continent"
                                    className="mt-1 block w-full"
                                    autoComplete="continent"
                                    value={data.continent || ''}
                                    handleChange={(e) => setData('continent', e.target.value)}
                                />
                                <InputError message={errors.disk_gb} className="mt-2"/>
                            </div>
                            <div>

                            </div>
                        </div>
                        <UpdateButton processing={processing}>Update IP</UpdateButton>
                    </form>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this IP address?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={deleteItem}>
                                Yes, I'm sure
                            </Button>
                            <Button onClick={() => setShowModal(false)} color="gray">
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </AuthenticatedLayout>
    );
}
