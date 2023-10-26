import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({auth}) {

    const {data, setData, post, processing, reset, errors} = useForm({
        url: '',
        api_token: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('import.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Import My Idlers
                server data</h2>}
        >
            <Head title="Import My Idlers"/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                            <div className="col-span-4">
                                <InputLabel forInput="url" value="My Idlers API URL"/>
                                <TextInput
                                    name="url"
                                    value={data.url}
                                    className="mt-1 block w-full"
                                    autoComplete="url"
                                    handleChange={(e) => setData('url', e.target.value)}
                                    maxLength={125}
                                    required
                                    isFocused={true}
                                />
                                <InputError message={errors.url} className="mt-2"/>
                            </div>
                            <div className="col-span-4">
                                <InputLabel forInput="api_token" value="API Token"/>
                                <TextInput
                                    name="api_token"
                                    className="mt-1 block w-full"
                                    autoComplete="api_token"
                                    value={data.api_token}
                                    handleChange={(e) => setData('api_token', e.target.value)}
                                    maxLength={60}
                                    required
                                />
                                <InputError message={errors.api_token} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Import
                        </PrimaryButton>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
