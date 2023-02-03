import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select, Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import {HiOutlineArrowLeft, HiTrash} from "react-icons/hi";

export default function Edit({auth, servers, resource}) {

    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

    const {data, setData, patch, processing, errors} = useForm({
        ip: resource.ip,
        asn: resource.asn,
        org: resource.org,
        isp: resource.isp,
        timezone_gmt: resource.timezone_gmt,
        country: resource.country,
        city: resource.city,
        continent: resource.continent,
        server_id: (resource.assigned) ? resource.assigned.server_id : null,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('ip.update', resource.id));
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

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit
                IP address</h2>}
        >
            <Head title="Edit IP"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="xs" href={route('ip.show', resource.id)}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                        Back to IP
                    </Button>
                    <Button color={'failure'} size="xs" onClick={() => setShowModal(true)} type="button">
                        <HiTrash className="mr-2 h-5 w-5"/>
                        Delete IP
                    </Button>
                </div>
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
                                    value={(resource.server_id) ? resource.server_id : null}
                                    handleChange={(e) => setData('server_id', e.target.value)}

                            >
                                <option value=''>Choose</option>
                                {servers.map(servers => <option key={servers.id} value={servers.id}>{servers.hostname} ({servers.title})</option>)}
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
                                required
                            />
                            <InputError message={errors.asn} className="mt-2"/>
                        </div>
                        <div>
                            <InputLabel forInput="org" value="org"/>
                            <TextInput
                                name="org"
                                className="mt-1 block w-full"
                                autoComplete="org"
                                value={resource.org || ''}
                                handleChange={(e) => setData('org', e.target.value)}
                                required
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
                    <PrimaryButton
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        processing={processing}>
                        Update IP
                    </PrimaryButton>
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
