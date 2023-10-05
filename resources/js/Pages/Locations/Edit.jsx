import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import DangerButton from "@/Components/DangerButton";
import UpdateButton from "@/Components/UpdateButton";
import BackButton from "@/Components/BackButton";
import ResponseAlert from "@/Components/Alert";

export default function Edit({auth}) {

    const resource = usePage().props.resource;
    const alert = usePage().props.alert;

    const [showModal, setShowModal] = useState(false);

    const {data, setData, patch, processing, errors} = useForm({
        city: resource.city,
        country: resource.country,
        lat: resource.lat,
        lon: resource.lon
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('location.update', resource.id));
    };

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('location.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit
                Location</h2>}
        >
            <Head title={"Edit location " + resource.city ?? ""}/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('location.index')}>Back to locations</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-8 sm:gap-4">
                            <div className='col-span-4'>
                                <InputLabel forInput="city" value="City"/>
                                <TextInput
                                    name="title"
                                    value={data.city || ''}
                                    className="mt-1 block w-full"
                                    autoComplete="city"
                                    handleChange={(e) => setData('city', e.target.value)}
                                    required
                                />
                                <InputError message={errors.city} className="mt-2"/>
                            </div>
                            <div className='col-span-4'>
                                <InputLabel forInput="country" value="Country"/>
                                <TextInput
                                    name="country"
                                    className="mt-1 block w-full"
                                    autoComplete="country"
                                    value={data.country || ''}
                                    handleChange={(e) => setData('country', e.target.value)}
                                    required
                                />
                                <InputError message={errors.country} className="mt-2"/>
                            </div>
                            <div className='col-span-2'>
                                <InputLabel forInput="lat" value="Lat"/>
                                <TextInput
                                    type="number"
                                    name="lat"
                                    className="mt-1 block w-full"
                                    autoComplete="lat"
                                    value={data.lat || ''}
                                    handleChange={(e) => setData('lat', e.target.value)}
                                />
                                <InputError message={errors.lat} className="mt-2"/>
                            </div>
                            <div className='col-span-2'>
                                <InputLabel forInput="lon" value="Lon"/>
                                <TextInput
                                    type="number"
                                    name="lon"
                                    className="mt-1 block w-full"
                                    autoComplete="lon"
                                    value={data.lon || ''}
                                    handleChange={(e) => setData('lon', e.target.value)}
                                />
                                <InputError message={errors.lon} className="mt-2"/>
                            </div>
                        </div>
                        <UpdateButton processing={processing} className={''}>Update location</UpdateButton>
                        <DangerButton onClick={() => setShowModal(true)} type="button"
                                      className="px-5 py-2 ml-0 sm:ml-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                            Delete location
                        </DangerButton>
                    </form>
                </div>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this location?
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
