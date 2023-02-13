import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";
import UpdateButton from "@/Components/UpdateButton";

export default function Edit({auth, resource, alert_type, alert_message}) {

    const {data, setData, patch, processing, reset, errors} = useForm({
        save_to: resource.save_to,
        save_as: resource.save_as,
        option: resource.option,
        compress: resource.compress,
        custom_flags: resource.custom_flags,
        these_tables: resource.these_tables
    });

    const [hasAlert, setHasAlert] = React.useState(true);

    const submit = (e) => {
        e.preventDefault();

        patch(route('mysqldump.update', resource.id));
        navigate(route('mysqldump.show', resource.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit
                MySQL dump</h2>}
        >
            <Head title="Edit MySQL dump"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('mysqldump.show', resource.id)}>Back to MySQL dump</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <h1 className={'text-lg text-gray-800 dark:text-white mb-2'}><span className={'text-gray-600 dark:text-gray-300'}>Database:</span> {resource.database.name} ({resource.database_conn.host})
                        <span className={'text-gray-600 dark:text-gray-300'}> DB
                            user:</span> {resource.database_conn.username} <span className={'text-gray-600 dark:text-gray-300'}>Server:</span> {resource.server.hostname} ({resource.server.title})</h1>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">

                            <div className="sm:col-span-3 col-span-4">
                                <InputLabel forInput="save_to" value="Save to"/>
                                <TextInput
                                    name="save_to"
                                    className="mt-1 block w-full"
                                    autoComplete="save_to"
                                    value={data.save_to}
                                    handleChange={(e) => setData('save_to', e.target.value)}
                                    maxLength={64}
                                />
                                <InputError message={errors.save_to} className="mt-2"/>
                            </div>

                            <div className="sm:col-span-3 col-span-4">
                                <InputLabel forInput="save_as" value="Save as"/>
                                <TextInput
                                    name="save_as"
                                    className="mt-1 block w-full"
                                    autoComplete="save_as"
                                    value={data.save_as}
                                    handleChange={(e) => setData('save_as', e.target.value)}
                                    maxLength={64}
                                />
                                <InputError message={errors.save_as} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="option" value="Options"/>
                                </div>
                                <Select onChange={(e) => setData('option', e.target.value)}
                                        name="option"
                                        required={true}
                                        value={data.option}
                                        handleChange={(e) => setData('option', e.target.value)}
                                >
                                    <option value='0'>None</option>
                                    <option value='1'>--quick</option>
                                    <option value='2'>--opt</option>
                                    <option value='3'>--add-locks</option>
                                    <option value='4'>--single-transaction</option>
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="custom_flags" value="Custom flags"/>
                                <TextInput
                                    name="custom_flags"
                                    className="mt-1 block w-full"
                                    autoComplete="custom_flags"
                                    value={data.custom_flags}
                                    handleChange={(e) => setData('custom_flags', e.target.value)}
                                    maxLength={64}
                                />
                                <InputError message={errors.custom_flags} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-1 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="compress" value="Compress"/>
                                </div>
                                <Select
                                    onChange={(e) => setData('compress', e.target.value)}
                                    name="compress"
                                    required={true}
                                    value={data.compress}
                                    handleChange={(e) => setData('compress', e.target.value)}
                                >
                                    <option value='0'>No</option>
                                    <option value='1'>Yes</option>
                                </Select>
                            </div>

                            <div className="col-span-6">
                                <InputLabel forInput="these_tables" value="These tables only (separate by space)"/>
                                <TextInput
                                    name="these_tables"
                                    className="mt-1 block w-full"
                                    autoComplete="these_tables"
                                    value={data.these_tables}
                                    handleChange={(e) => setData('these_tables', e.target.value)}
                                    maxLength={255}
                                />
                                <InputError message={errors.these_tables} className="mt-2"/>
                            </div>

                        </div>
                        <UpdateButton processing={processing}>Update MySQL dump</UpdateButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
