import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal, Dropdown} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {
    HiFolderOpen,
    HiLightningBolt
} from 'react-icons/hi';
import ServerCardSpecs from "@/Components/ServerCardSpecs";
import ServerCardConnection from "@/Components/ServerCardConnection";
import CreatedAtText from "@/Components/CreatedAtText";
import UpdatedAtText from "@/Components/UpdatedAtText";
import ServerCardDetails from "@/Components/ServerCardDetails";
import ServerStatusButton from "@/Components/ServerStatusButton";
import DeleteButton from "@/Components/DeleteButton";
import BackButton from "@/Components/BackButton";
import EditButton from "@/Components/EditButton";
import IndigoButton from "@/Components/IndigoButton";
import TealButton from "@/Components/TealButton";
import MonoButton from "@/Components/MonoButton";
import axios from "axios";

export default function Show({auth, resource, servers, alert_type, alert_message}) {

    const user = usePage().props.auth.user;

    const [showModal, setShowModal] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    const [dropDownEnabled, setDropDownEnabled] = React.useState(false);

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

    const doPingFromTo = event => {
        setDropDownEnabled(false);
        axios.get(route('run.ping-from-to', [resource.id, event.target.id])).then(response => {
            window.location.href = route('ping-from-to', [resource.id, event.target.id]);
        }).catch(err => {
            console.log('Error running ping');
        });
        setDropDownEnabled(true);
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.title}</h2>}
        >
            <Head title={"Server " + resource.hostname}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('server.index')}>Back to servers</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-l">
                    <div className="py-6 px-4 mx-auto max-w-6xl lg:py-10">
                        {resource.operating_system !== null ?
                            <span
                                className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{resource.operating_system}</span>
                            : null
                        }
                        <span
                            className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-4">{resource.type.name}</span>
                        <div className={'grid md:grid-cols-2 grid-cols-1'}>
                            <div className={'md:col-span-1 col-span-2'}>
                                <ServerCardDetails resource={resource}></ServerCardDetails>
                            </div>
                            <div className={'md:col-span-1 col-span-2'}>
                                <ServerCardSpecs resource={resource}></ServerCardSpecs>
                                <ServerCardConnection connection={resource.conn}></ServerCardConnection>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                                <UpdatedAtText updated_at={resource.updated_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></UpdatedAtText>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                            {
                                (() => {
                                    if (typeof (resource.conn) != "undefined" && resource.conn !== null) {
                                        return (
                                            <IndigoButton href={route('connection.show', resource.conn.id)}>
                                                <HiLightningBolt className="mr-2 h-5 w-5"/>
                                                Connect</IndigoButton>)
                                    }
                                })()
                            }
                            {
                                (() => {
                                    if (typeof (resource.sftp_conn) != "undefined" && resource.sftp_conn !== null) {
                                        return (<TealButton href={route('sftp.show', resource.sftp_conn.id)}>
                                            <HiFolderOpen className="mr-2 h-5 w-5"/>
                                            SFTP Connect</TealButton>)
                                    }
                                })()
                            }
                            <EditButton href={route('server.edit', resource.id)}>Edit server</EditButton>
                            <DeleteButton onClick={() => setShowModal(true)}>Delete server</DeleteButton>
                            <ServerStatusButton resource={resource}></ServerStatusButton>
                            {
                                (() => {
                                    if ((typeof (resource.conn) != "undefined" && resource.conn !== null) && (typeof (resource.cpu_freq) === "undefined" || resource.cpu_freq === null)) {
                                        return (
                                            <MonoButton href={route('server.get-information', resource.id)}>Fetch server
                                                specs</MonoButton>
                                        )
                                    }
                                })()
                            }
                            <Dropdown
                                label="Ping another server"
                                dismissOnClick={false}
                                disabled={dropDownEnabled}
                                className={'dark:bg-gray-500'}
                                size={'sm'}
                            >

                                {servers.map(server =>
                                    <Dropdown.Item key={server.id} className={(dropDownEnabled)? 'hidden' : null}>
                                        <a onClick={doPingFromTo} id={server.id}>{server.hostname} ({server.title})</a>
                                    </Dropdown.Item>)}
                            </Dropdown>
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
