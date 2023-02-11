import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiPencil} from "react-icons/hi";
import {HiCpuChip} from "react-icons/all";
import CreatedAtText from "@/Components/CreatedAtText";
import UpdatedAtText from "@/Components/UpdatedAtText";
import BackButton from "@/Components/BackButton";
import DeleteButton from "@/Components/DeleteButton";
import TealButton from "@/Components/TealButton";
import EmeraldButton from "@/Components/EmeraldButton";

export default function Show({auth, resource, alert_type, alert_message}) {

    const [showModal, setShowModal] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('ip.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"IP " + resource.ip}</h2>}>
            <Head title={"IP " + resource.ip}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('ip.index',)}>Back to IPs</BackButton>
                    <EmeraldButton href={route('server.show', resource.server.id)}><HiCpuChip className="mr-2 h-5 w-5"/>Server</EmeraldButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-2 md:px-6 max-w-6xl md:py-8">
                        <div className={'grid md:grid-cols-2 grid-cols-1'}>
                            <div className={'md:col-span-1 col-span-2'}>
                                 <span
                                     className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-4">{resource.is_ipv4 === 1 ? ("IPv4") : ("IPv6")}</span>
                                <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.ip}</h2>
                                <p className="mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300">{resource.server.hostname} ({resource.server.title})</p>
                                <p className="mb-4 text-lg font-bold leading-none text-gray-700 md:text-xl dark:text-gray-300">{resource.asn} {resource.org}</p>
                            </div>
                            <div className={'md:col-span-1 col-span-2 md:mt-4'}>
                                <dl className="flex space-x-2 sm:space-x-10">
                                    <div>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Country</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{resource.country}</dd>
                                    </div>
                                    <div>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">City</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{resource.city}</dd>
                                    </div>
                                    <div>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Continent</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{resource.continent}</dd>
                                    </div>
                                    <div>
                                        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">GMT</dt>
                                        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{resource.timezone_gmt}</dd>
                                    </div>
                                </dl>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                                <UpdatedAtText updated_at={resource.updated_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></UpdatedAtText>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <TealButton href={route('ip.edit', resource.id)}><HiPencil className="mr-2 h-5 w-5"/>Edit IP</TealButton>
                            <DeleteButton onClick={() => setShowModal(true)}>Delete IP</DeleteButton>
                        </div>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this IP address?
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
