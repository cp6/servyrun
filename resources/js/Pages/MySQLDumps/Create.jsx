import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select, Button, Checkbox, Label} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import {HiOutlineArrowLeft} from "react-icons/hi";
import axios from "axios";

export default function Create({auth, servers, alert_type, alert_message}) {

    const [optChecked, setOptChecked] = React.useState(false);

    const {data, setData, post, processing, reset, errors} = useForm({
        connection_id: '',
        server_id: '',
        database_id: '',
        db_connection_id: '',
        certain_tables: '',
        save_to: '',
        save_as: 'dump.sql',
        compress: '',
        quick: '',
        opt: optChecked,
        lock_tables: '',
        single_transaction: '',
        exclude_tables: ''
    });

    const [hasAlert, setHasAlert] = React.useState(true);

    const [connections, setConnections] = React.useState([]);

    const [databaseConnections, setDatabaseConnections] = React.useState([]);

    const [databases, setDatabases] = React.useState([]);

    const [tables, setTables] = React.useState([]);

    const user = usePage().props.auth.user;

    const submit = (e) => {
        e.preventDefault();

        post(route('mysqldump.store'));
        navigate(route('mysqldump.index'));
    };

    async function getIpFromHostname(dns_type = 'A') {

        const response = await fetch(route('domain-for-ip', [data.hostname, dns_type]), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.user.api_token,
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        return response.json();
    }

    const fetchServerConnections = event => {
        setData('server_id', event.target.value)

        if (event.target.value !== '') {
            axios.get(route('server.connections', event.target.value)).then(response => {
                setConnections(response.data);
            }).catch(err => {
                //
            });

            axios.get(route('server.db.connections', event.target.value)).then(response => {
                setDatabaseConnections(response.data);
            }).catch(err => {
                //
            });
        }
    };

    const fetchDatabases = event => {
        setData('db_connection_id', event.target.value)

        if (event.target.value !== '') {
            axios.get(route('db.connection.databases', event.target.value)).then(response => {
                setDatabases(response.data.databases);
            }).catch(err => {
                //
            });
        }
    };

    const fetchDatabaseTables = event => {
        setData(data => ({...data, database_id: event.target.value}));
        if (event.target.value !== '') {
            axios.get(route('db.show.tables.json', event.target.value)).then(response => {
                setData(data => ({
                    ...data, exclude_tables: response.data.map(function (item) {
                        return item["name"];
                    })
                }));
            }).catch(err => {
                //
            });
        }
    };

    function clearExcludedTables() {
        setData('exclude_tables', '');
    };

    const handleOptChecked = () => {

        if (optChecked) {
            setOptChecked(false);
        } else {
            setOptChecked(true);
        }
        setData('opt', optChecked);
        console.log(optChecked);
    };

    const optStatus = (e) => {
        const { checked } = e.target;

        console.log("checked " + checked);

        setOptChecked(optChecked => ({
            ...optChecked,    // <-- shallow copy previous state
            Active: checked, // <-- set new Active checked value
        }));
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                MySQL dump</h2>}
        >
            <Head title="Create MySQL dump"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="xs" href={route('server.index')}>
                        <HiOutlineArrowLeft className="mr-2 h-5 w-5"/>
                        Back to MySQL dumps
                    </Button>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">

                            <div className="sm:col-span-3 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server_id" value="Server"/>
                                </div>
                                <Select onChange={fetchServerConnections}
                                        name="server_id"
                                        required={true}
                                        value={data.server_id}
                                        handleChange={(e) => setData('server_id', e.target.value)}
                                >
                                    <option value=''>Choose</option>
                                    {servers.map(servers => <option key={servers.id}
                                                                    value={servers.id}>{servers.hostname} ({servers.title})</option>)}
                                </Select>
                            </div>

                            <div className="sm:col-span-3 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection_id" value="Server connection"/>
                                </div>
                                <Select onChange={(e) => setData('connection_id', e.target.value)}
                                        name="connection_id"
                                        required={true}
                                        value={data.connection_id}
                                        handleChange={(e) => setData('connection_id', e.target.value)}
                                >
                                    <option value=''>Choose a server with a connection</option>
                                    {connections.map(connections => <option key={connections.id}
                                                                            value={connections.id}>User: {connections.username} ({connections.id})</option>)}
                                </Select>
                            </div>

                            <div className="sm:col-span-3 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="db_connection_id" value="Database connection"/>
                                </div>
                                <Select onChange={fetchDatabases}
                                        name="db_connection_id"
                                        value={data.db_connection_id}
                                        handleChange={(e) => setData('db_connection_id', e.target.value)}
                                >
                                    <option value=''>Choose</option>
                                    {databaseConnections.map(databaseConnections => <option key={databaseConnections.id}
                                                                                            value={databaseConnections.id}>{databaseConnections.host} ({databaseConnections.title})</option>)}
                                </Select>
                            </div>

                            <div className="sm:col-span-3 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="database_id" value="Database"/>
                                </div>
                                <Select onChange={fetchDatabaseTables}
                                        name="database_id"
                                        required={true}
                                        value={data.database_id}
                                        handleChange={(e) => setData('database_id', e.target.value)}
                                >
                                    <option value=''>Choose</option>
                                    {databases.map(databases => <option key={databases}
                                                                        value={databases}>{databases}</option>)}
                                </Select>
                            </div>

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

                            <div className="flex items-center gap-2 mt-2">
                                <Checkbox id="quick"/>
                                <Label htmlFor="quick">
                                    --quick
                                </Label>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Checkbox name={'opt'} checked={optStatus.Active} onChange={optStatus}/>
                                <Label htmlFor="opt">
                                    --opt
                                </Label>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Checkbox id="lock_tables"/>
                                <Label htmlFor="lock_tables">
                                    --add-locks
                                </Label>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Checkbox id="single_transaction"/>
                                <Label htmlFor="single_transaction">
                                    --single-transaction
                                </Label>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Checkbox id="compress"/>
                                <Label htmlFor="compress">
                                    compress
                                </Label>
                            </div>

                            <div className="col-span-6">
                                <InputLabel forInput="exclude_tables" value="Exclude tables"/>
                                <TextInput
                                    name="exclude_tables"
                                    className="mt-1 block w-full"
                                    autoComplete="exclude_tables"
                                    value={data.exclude_tables}
                                    handleChange={(e) => setData('exclude_tables', e.target.value)}
                                    maxLength={64}
                                />
                                <InputError message={errors.exclude_tables} className="mt-2"/>
                                <a onClick={clearExcludedTables}
                                   className={'text-sm font-medium text-yellow-500 dark:text-yellow-400 hover:cursor-pointer'}>Clear
                                    excluded
                                    tables</a>
                            </div>

                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create MySQL dump
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
