import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import BackButton from "@/Components/BackButton";
import ResponseAlert from "@/Components/Alert";

export default function Create({auth}) {

    const alert = usePage().props.alert;

    console.log(alert);

    const {data, setData, post, processing, reset, errors} = useForm({
        city: '',
        country: '',
        lat: '',
        lon: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('location.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                a location</h2>}
        >
            <Head title="Create location"/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('location.index')}>Back to locations</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-8 sm:gap-4">
                            <div className="col-span-4">
                                <InputLabel forInput="city" value="City"/>
                                <TextInput
                                    name="city"
                                    value={data.city}
                                    className="mt-1 block w-full"
                                    autoComplete="city"
                                    handleChange={(e) => setData('city', e.target.value)}
                                    maxLength={125}
                                    isFocused={true}
                                />
                                <InputError message={errors.city} className="mt-2"/>
                            </div>
                            <div className="col-span-4">
                                <InputLabel forInput="country" value="Country"/>
                                <TextInput
                                    name="country"
                                    className="mt-1 block w-full"
                                    autoComplete="country"
                                    value={data.country}
                                    handleChange={(e) => setData('country', e.target.value)}
                                    maxLength={125}
                                    required
                                />
                                <InputError message={errors.country} className="mt-2"/>
                            </div>
                            <div className="col-span-2">
                                <InputLabel forInput="lat" value="Lat"/>
                                <TextInput
                                    type="number"
                                    name="lat"
                                    className="mt-1 block w-full"
                                    autoComplete="lat"
                                    value={data.lat}
                                    handleChange={(e) => setData('lat', e.target.value)}
                                />
                                <InputError message={errors.lat} className="mt-2"/>
                            </div>
                            <div className="col-span-2">
                                <InputLabel forInput="lon" value="Lon"/>
                                <TextInput
                                    type="number"
                                    name="lon"
                                    className="mt-1 block w-full"
                                    autoComplete="lon"
                                    value={data.lon}
                                    handleChange={(e) => setData('lon', e.target.value)}
                                />
                                <InputError message={errors.lon} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create Location
                        </PrimaryButton>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
