import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {
    HiFolderOpen,
    HiLightningBolt, HiPencil, HiTrash, HiTrendingDown
} from 'react-icons/hi';
import ServerCardSpecs from "@/Components/ServerCardSpecs";
import ServerCardConnection from "@/Components/ServerCardConnection";
import CreatedAtText from "@/Components/CreatedAtText";
import UpdatedAtText from "@/Components/UpdatedAtText";
import ServerCardDetails from "@/Components/ServerCardDetails";
import ServerStatusButton from "@/Components/ServerStatusButton";
import BackButton from "@/Components/BackButton";
import ServerCardUsage from "@/Components/ServerCardUsage";
import ServerCardPingAnother from "@/Components/ServerCardPingAnother";
import {HiArrowDownCircle} from "react-icons/all";
import ServerLast3Commands from "@/Components/ServerLast3Commands";

export default function Show({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;
    const servers = usePage().props.servers;

    const [showModal, setShowModal] = useState(false);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('server.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.title}</h2>}
        >
            <Head title={"Server " + resource.hostname}/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('server.index')}>Back to servers</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                {resource.operating_system !== null ?
                                    <span
                                        className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{resource.operating_system}</span>
                                    : null
                                }
                                <span
                                    className="bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{resource.type.name}</span>
                            </div>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete server'}/>
                                {
                                    (() => {
                                        if ((typeof (resource.conn) != "undefined" && resource.conn !== null) && (typeof (resource.cpu_freq) === "undefined" || resource.cpu_freq === null)) {
                                            return (
                                                <HiArrowDownCircle
                                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                                    onClick={event => window.location.href = route('server.get-information', resource.id)}
                                                    title={'Fetch server specs'}></HiArrowDownCircle>
                                            )
                                        }
                                    })()
                                }
                                <HiPencil
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('server.edit', resource.id)}
                                    title={'Edit server'}/>
                                {
                                    (() => {
                                        if ((typeof (resource.conn) != "undefined" && resource.conn !== null)) {
                                            return (
                                                <>
                                                    <HiLightningBolt
                                                        className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                                        onClick={event => window.location.href = route('connection.show', resource.conn.id)}
                                                        title={'Go to connection'}/>
                                                    <HiTrendingDown
                                                        className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                                        onClick={event => window.location.href = route('server.usage.all', resource.id)}
                                                        title={'Go to usage'}/>
                                                </>
                                            )
                                        }
                                    })()
                                }
                                {
                                    (() => {
                                        if ((typeof (resource.sftp_conn) != "undefined" && resource.sftp_conn !== null)) {
                                            return (
                                                <HiFolderOpen
                                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                                    onClick={event => window.location.href = route('sftp.show', resource.sftp_conn.id)}
                                                    title={'Go to SFTP connection'}/>
                                            )
                                        }
                                    })()
                                }
                                <ServerStatusButton resource={resource}></ServerStatusButton>
                            </small>
                        </div>
                        <div className={'grid md:grid-cols-2 grid-cols-1'}>
                            <div className={'md:col-span-1 col-span-2'}>
                                <ServerCardDetails resource={resource}></ServerCardDetails>
                            </div>
                            <div className={'md:col-span-1 col-span-2 sm:text-end mt-2'}>
                                <p className="mb-2 text-gray-700 dark:text-gray-300">{resource.cpu ?? null}</p>
                                <ServerCardConnection connection={resource.conn}></ServerCardConnection>
                            </div>
                        </div>
                        <div className={'grid md:grid-cols-2 grid-cols-1'}>
                            <div className={'col-span-1'}>
                                <ServerCardSpecs resource={resource}></ServerCardSpecs>
                            </div>

                            <div className={'col-span-1 sm:text-end'}>
                                {
                                    (() => {
                                        if (resource.conn !== null && resource.conn.outputs_last5 !== null && resource.conn.outputs_last5.length > 0) {
                                            return (
                                                <>
                                                    <p className="mb-2 text-gray-800 dark:text-gray-200">Last 5 commands
                                                        ran</p>
                                                    <ServerLast3Commands commands={resource.conn.outputs_last5}/>
                                                </>
                                            )
                                        }
                                    })()
                                }
                            </div>
                        </div>
                        <ServerCardUsage serverId={resource.id} usage={null} uptime={null}></ServerCardUsage>
                        {
                            (() => {
                                if (typeof (resource.conn) != "undefined" && resource.conn !== null && servers.length > 0) {
                                    return (
                                        <ServerCardPingAnother serverId={resource.id}
                                                               servers={servers}></ServerCardPingAnother>
                                    )
                                }
                            })()
                        }
                        <div className={'grid md:grid-cols-2 grid-cols-1 mt-4'}>
                            <div className={'col-span-1'}>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                            </div>
                            <div className={'col-span-1 sm:text-end'}>
                                <UpdatedAtText updated_at={resource.updated_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></UpdatedAtText>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this server?
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
