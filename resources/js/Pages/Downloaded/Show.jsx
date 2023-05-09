import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useState} from "react";
import ResponseAlert from "@/Components/Alert";
import {HiDownload, HiTrash, HiUpload} from "react-icons/hi";
import CreatedAtText from "@/Components/CreatedAtText";
import BackButton from "@/Components/BackButton";
import {numberFormat} from "@/helpers";

export default function Show({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;

    const [showModal, setShowModal] = useState(false);

    const deleteItem = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('downloaded.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"File " + resource.saved_as}</h2>}>
            <Head title={"File " + resource.saved_as}></Head>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('downloaded.index')}>Back to downloaded</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between">
                            <div>
                                    <span
                                        className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">Size {numberFormat(resource.size / 1000 / 1000)} MB</span>
                                <span
                                    className="ml-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">DL speed {numberFormat(resource.speed_mbps)} Mbps</span>
                            </div>
                            <small className="text-sm text-gray-700">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete file'}/>
                                <HiDownload
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('downloaded.download', resource.id)}
                                    title={'Download file through browser'}/>
                                <HiUpload
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('downloaded.upload.form', resource.id)}
                                    title={'Upload file to another SFTP'}/>
                            </small>
                        </div>
                        <div className={'grid grid-cols-2'}>
                            <div className={'md:col-span-1 col-span-2'}>
                                <h2 className="mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white">{resource.saved_as}</h2>
                            </div>
                            <div className={'md:col-span-1 col-span-2'}>
                                <p className="mt-4 mb-4 text-lg font-bold leading-none text-gray-600 md:text-lg dark:text-gray-400">Downloaded
                                    from <span
                                        className={'text-gray-700 dark:text-gray-300'}>{resource.conn.server.hostname} {resource.from_dir}/{resource.filename}</span>
                                </p>
                            </div>
                        </div>
                        <div className={'grid md:grid-cols-2 grid-cols-1'}>
                            <div className={'col-span-1'}>
                                <CreatedAtText created_at={resource.created_at}
                                               string_format={'hh:mm:ssa do LLL yyyy'}
                                               pre_text={'Downloaded: '}></CreatedAtText>
                            </div>
                            <div className={'col-span-1'}></div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this File?
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
