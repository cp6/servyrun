import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Button} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import {HiOutlineArrowLeft} from "react-icons/hi";
import BackButton from "@/Components/BackButton";

export default function Create({auth}) {

    const {data, setData, post, processing, reset, errors} = useForm({
        title: '',
        command: ''
    });

    const user = usePage().props.auth.user;

    const submit = (e) => {
        e.preventDefault();

        post(route('command.store'));
        navigate(route('command.index'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                command</h2>}
        >
            <Head title="Create command"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('command.index')}>Back to commands</BackButton>
                </div>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                <form onSubmit={submit}>
                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                        <div className="col-span-4">
                            <InputLabel forInput="title" value="Title"/>
                            <TextInput
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                handleChange={(e) => setData('title', e.target.value)}
                                maxLength={64}
                                required
                                isFocused={true}
                            />
                            <InputError message={errors.title} className="mt-2"/>
                        </div>
                        <div className="col-span-4">
                            <InputLabel forInput="command" value="Command"/>
                            <TextInput
                                name="command"
                                className="mt-1 block w-full"
                                autoComplete="command"
                                value={data.command}
                                handleChange={(e) => setData('command', e.target.value)}
                                required
                            />
                            <InputError message={errors.command} className="mt-2"/>
                        </div>
                    </div>
                    <PrimaryButton
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        processing={processing}>
                        Create Command
                    </PrimaryButton>
                </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
