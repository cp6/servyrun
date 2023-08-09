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

    const {data, setData, post, processing, reset, errors} = useForm({
        password: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('key.store'));
        navigate(route('key.index'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Upload
                key</h2>}
        >
            <Head title="Create key"/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('key.index')}>Back to keys</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                <form onSubmit={submit}>
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                        <div className='mt-2 sm:col-span-4 col-span-4'>
                            <p className='text-yellow-400'>NOTE: Encrypted OpenSSH private keys are not supported</p>
                        </div>
                        <div className="col-span-4">

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Key file</label>

                            <input
                                type="file"
                                className="w-full px-4 py-2"
                                name="key_file"
                                onChange={(e) =>
                                    setData("key_file", e.target.files[0])
                                }
                            />

                            <span className="text-red-600">
                                {errors.key_file}
                            </span>

                        </div>
                        <div className='mt-2 sm:col-span-4 col-span-4'>
                            <p className='text-gray-500 dark:text-gray-400'>Passwords are stored encrypted</p>
                        </div>
                        <div className="col-span-4">
                            <InputLabel forInput="password" value="Password"/>
                            <TextInput
                                name="password"
                                className="mt-1 block w-full"
                                autoComplete="password"
                                value={data.password}
                                handleChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2"/>
                        </div>
                    </div>
                    <PrimaryButton
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        processing={processing}>
                        Create key
                    </PrimaryButton>
                </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
