import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiHashtag, HiPencil, HiPlay, HiTrash} from "react-icons/hi";
import axios from "axios";
import BackButton from "@/Components/BackButton";
import DatabaseStatusButton from "@/Components/DatabaseStatusButton";
import CreatedAtText from "@/Components/CreatedAtText";
import UpdatedAtText from "@/Components/UpdatedAtText";

export default function Show({auth, resource, alert_type, alert_message}) {

    const [showModal, setShowModal] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    const [isUp, setIsUp] = useState(null);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('mysqldump.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    const runTheDump = () => {
        axios.get(route('mysqldump.run', resource.id)).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error getting version');
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"MySQL dump"}</h2>}>
            <Head title={"MySQL dump"}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('mysqldump.index')}>Back to MySQL dumps</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-6 px-2 mx-auto max-w-6xl lg:py-8">
                        <div className="flex items-center justify-between">
                            <div>           <span
                                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-4"><a
                                href={route('db.show', resource.database.id)}>Database {resource.database.name}</a></span>
                                {resource.version !== null ?
                                    <span
                                        className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><a
                                        href={route('server.show', resource.server.id)}>Server {resource.server.title}</a></span>
                                    :
                                    null}</div>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete MySQL dump'}/>
                                <HiPencil
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('mysqldump.edit', resource.id)}
                                    title={'Edit MySQL dump'}/>
                                <HiPlay
                                    className="md:ml-3 ml-1 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={runTheDump} title={'Run this MySQL dump'}/>
                            </small>
                        </div>
                        {
                            (() => {
                                if (typeof (resource.these_tables) != "undefined" && resource.these_tables !== null) {
                                    return (
                                        <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-600 md:text-2xl dark:text-gray-300">These
                                            tables only: <span
                                                className={'text-gray-900 dark:text-white'}>{resource.these_tables}</span>
                                        </h2>
                                    )
                                } else {
                                    return (
                                        <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">Whole
                                            database</h2>
                                    )
                                }
                            })()
                        }
                        <h2 className="mt-4 mb-2 text-md font-bold leading-none text-gray-600 md:text-xl dark:text-gray-300">Save
                            as: <span
                                className={'text-gray-900 dark:text-white'}>{resource.save_to}/{resource.save_as}</span>
                        </h2>
                        <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-600 md:text-xl dark:text-gray-300">DB
                            user: <span
                                className={'text-gray-900 dark:text-white'}>{resource.database_conn.username}</span>
                        </h2>
                        <p className="mb-4 text-xl font-bold leading-none md:text-2xl text-gray-900 dark:text-white">{resource.compress === 1 ? 'compress' : null}</p>
                        <p className="mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300">{resource.flags}</p>
                        <div className={'grid md:grid-cols-3 grid-cols-3'}>
                            <div className={'col-span-1'}>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></CreatedAtText>
                            </div>
                            <div className={'col-span-1'}>
                                <UpdatedAtText updated_at={resource.updated_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}></UpdatedAtText>
                            </div>
                            <div className={'col-span-1'}>
                                {resource.last_ran !== null ? <CreatedAtText created_at={resource.last_ran}
                                                                             string_format={'hh:mm:ssa do LLL yyyy'}
                                                                             pre_text={'Last ran at: '}></CreatedAtText> :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this MySQL dump?
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
