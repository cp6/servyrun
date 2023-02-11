import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";

export default function Create({auth, servers, alert_type, alert_message}) {

    const {data, setData, post, processing, reset, errors} = useForm({
        server_id: '',
        ip: '   '
    });

    const [hasAlert, setHasAlert] = React.useState(true);

    const submit = (e) => {
        e.preventDefault();

        post(route('ip.store'));
        navigate(route('ip.index'));
    };

    function handlePeriodChange(selVal) {
        this.props.handlePeriodChange(selVal);
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Create
                an IP address</h2>}
        >
            <Head title="Create IP address"/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('ip.index')}>Back to IPs</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className='bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6'>
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="server_id" value="Server"/>
                                </div>
                                <Select onChange={(e) => setData('server_id', e.target.value)}
                                        name="server_id"
                                        required={true}
                                        value={data.server_id}
                                        handleChange={(e) => setData('server_id', e.target.value)}
                                >
                                    <option value=''>Choose one</option>
                                    {servers.map(servers => <option key={servers.id}
                                        value={servers.id}>{servers.title} ({servers.hostname})</option>)}
                                </Select>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <InputLabel forInput="ip" value="IP address"/>
                                <TextInput
                                    id="ip"
                                    name="ip"
                                    value={data.ip}
                                    className="mt-1 block w-full"
                                    autoComplete="ip"
                                    handleChange={(e) => setData('ip', e.target.value)}
                                    maxLength={155}
                                    required
                                />
                                <InputError message={errors.ip} className="mt-2"/>
                            </div>
                            <div className="sm:col-span-2 col-span-4">
                                <p className='text-gray-500 dark:text-gray-400'>GEO IP address data will be fetched which you can then edit.</p>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                            Create IP address
                        </PrimaryButton>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
