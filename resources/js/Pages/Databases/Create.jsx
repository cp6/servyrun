import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import axios from "axios";
import BackButton from "@/Components/BackButton";

export default function Create({auth}) {

    const alert = usePage().props.alert;
    const connections = usePage().props.connections;
    const [database, setDatabase] = React.useState('');

    const {data, setData, post, processing, reset, errors} = useForm({
        db_connection_id: null,
        name: database,
        name_select: database
    });

    const [dbNames, setDbNames] = React.useState([]);

    const [dbNamesStatus, setDbNamesStatus] = React.useState(1);

    const submit = (e) => {
        e.preventDefault();

        post(route('db.store'));
        navigate(route('db.index'));
    };

    const fetchDatabases = event => {
        setData('db_connection_id', event.target.value)

        if (event.target.value !== '') {
            axios.get(route('db.connection.databases', event.target.value)).then(response => {
                setDbNames(response.data.databases);
                setDbNamesStatus(0);
            }).catch(err => {
                setDbNamesStatus(1);
            });
        }
    };

    const fillDatabase = event => {
        setData('name', event.target.value);
        setDatabase(event.target.value);
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Add a
                database</h2>}
        >
            <Head title="Add database"/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('db.index')}>Back to databases</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">

                    {connections.length === 0 ?
                        <p className={'text-gray-600 dark:text-gray-300'}>Please create a database connection first</p>
                        :
                        <form onSubmit={submit}>
                            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">
                                <div className="sm:col-span-2 col-span-4">
                                    <div className="mb-2 block">
                                        <InputLabel forInput="db_connection_id" value="Database connection"/>
                                    </div>
                                    <Select onChange={fetchDatabases}
                                            name="db_connection_id"
                                            required={true}
                                            value={data.db_connection_id}
                                    >
                                        <option value=''>Choose</option>
                                        {connections.map(connections => <option key={connections.id}
                                                                                value={connections.id}>{connections.host} ({connections.title})</option>)}
                                    </Select>
                                </div>
                                <div className="sm:col-span-2 col-span-4">
                                    <InputLabel forInput="name" value="Database name"/>
                                    <TextInput
                                        name="name"
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        value={data.name}
                                        handleChange={(e) => setData('name', e.target.value)}
                                        maxLength={64}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="sm:col-span-2 col-span-4">
                                    <div className="mb-2 block">
                                        <InputLabel forInput="name_select" value="Database name"/>
                                    </div>
                                    <Select onChange={fillDatabase}
                                            name="name_select"
                                            value={database}
                                            disabled={dbNamesStatus}
                                            required
                                    >
                                        <option value=''>Choose a connection first</option>
                                        {dbNames.map(dbNames => <option key={dbNames}
                                                                        value={dbNames}>{dbNames}</option>)}
                                    </Select>
                                </div>
                            </div>
                            <PrimaryButton
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                processing={processing}>
                                Add database
                            </PrimaryButton>
                        </form>
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
