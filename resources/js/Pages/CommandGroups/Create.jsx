import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import BackButton from "@/Components/BackButton";
import ResponseAlert from "@/Components/Alert";
import {Select} from "flowbite-react";

export default function Create({auth}) {

    const alert = usePage().props.alert;

    const commands = usePage().props.commands;

    const {data, setData, post, processing, reset, errors} = useForm({
        command_id: '',
        title: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('command-group.store'));
        navigate(route('command-group.index'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create a command
                group</h2>}
        >
            <Head title="Create command group"/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('command-group.index')}>Back to command groups</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="command_id" value="Command"/>
                                </div>
                                <Select onChange={(e) => setData('command_id', e.target.value)}
                                        name="command_id"
                                        required={true}
                                        value={data.command_id}
                                        handleChange={(e) => setData('command_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {commands.map(commands => <option key={commands.id}
                                                                      value={commands.id}>{commands.title}</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="title" value="Command group title"/>
                                <TextInput
                                    name="title"
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    value={data.title}
                                    handleChange={(e) => setData('title', e.target.value)}
                                />
                                <InputError message={errors.title} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create command group
                        </PrimaryButton>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
