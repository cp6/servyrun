import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';
import {Button, Modal} from "flowbite-react";
import React, {useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ReactDOM from "react-dom/client";
import Output from "@/Components/Output";
import ResponseAlert from "@/Components/Alert";
import {HiBookOpen, HiDocumentDownload, HiPencil, HiServer, HiTrash} from "react-icons/hi";
import BackButton from "@/Components/BackButton";
import ProgressBar from "@/Components/ProgressBar";
import axios from "axios";

export default function Show({auth, resource, ip, alert_type, alert_message}) {

    const {data, setData, post, processing, processing2, reset, errors} = useForm({
        the_command1: '',
        file: '',
        save_as: ''
    });

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    const [runTime, setRunTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setRunTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    async function postData() {
        setRunTime(0);
        setRunning(true);

        const response = await fetch(route('sftp.run', resource.id), {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                'the_command1': data.the_command1
            })
        });

        setRunning(false);

        return response.json();
    }

    const submit = (e) => {
        e.preventDefault();
        const container = document.getElementById('command_output_div');

        const root = ReactDOM.createRoot(container);

        const createOutput = postData().then((the_response) => {

            const the_output = <Output id='commandOutput' title={null} the_command={data.the_command1}
                                       created_at={new Date()}
                                       the_output={the_response.output} seconds={the_response.seconds_taken}
                                       rows={10}></Output>

            root.render(the_output);

        });

    };

    useEffect(() => {
        if (uploading) {
            axios.get(route('sftp.upload.progress', resource.id)).then(response => {
                console.log(response.data.progress);
                setUploadProgress(response.data.progress);
            }).catch(err => {
                console.log('Error running');
            });
        }
    }, [uploading]);

    const uploadFile = (e) => {
        setUploading(true);

        e.preventDefault();

        post(route('sftp.upload', resource.id));
    };

    const deleteItem = () => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('sftp.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.username}@{ip}:{resource.port} ({resource.server.hostname})</h2>}
        >
            <Head title={"SFTP connection " + resource.id}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('sftp.index')}>Back to SFTP connections</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-6 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Run SFTP command</h1>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete SFTP connection'}/>
                                <HiPencil
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('sftp.edit', resource.id)}
                                    title={'Edit SFTP connection'}/>
                                <HiBookOpen
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('sftp.read', resource.id)}
                                    title={'Read a file'}/>
                                <HiServer
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('server.show', resource.server.id)}
                                    title={'Go to server'}/>
                                <HiDocumentDownload
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('sftp.create-download-to-server', resource.id)}
                                    title={'Download a file to this host server'}/>
                            </small>
                        </div>
                        <form onSubmit={submit}>
                            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                                <div className="col-span-4">
                                    <InputLabel forInput="the_command1" value="Command"/>
                                    <TextInput
                                        name="the_command1"
                                        value={data.the_command1}
                                        className="mt-1 block w-full"
                                        autoComplete="the_command1"
                                        handleChange={(e) => setData('the_command1', e.target.value)}
                                        maxLength={64}
                                        required={true}
                                    />
                                    <InputError message={errors.the_command1} className="mt-2"/>
                                </div>
                            </div>
                            <PrimaryButton
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                processing={processing}>
                                Run
                            </PrimaryButton>
                        </form>
                    </div>
                    <div className="py-2 px-4 mx-auto max-w-7xl">
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                            <div className="col-span-2">
                                <form action={route('sftp.download', resource.id)} method={'post'}>
                                    <input type="hidden" name="_token"
                                           value={document.getElementsByName('csrf-token')[0].getAttribute('content')}/>
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                                        <div className="col-span-4">
                                            <p className={'text-lg text-gray-800 dark:text-white pb-2'}>Download a
                                                file</p>
                                            <InputLabel forInput="file" value="Full file path and name"/>
                                            <TextInput
                                                name="file"
                                                value={data.file}
                                                className="mt-1 block w-full"
                                                autoComplete="file"
                                                handleChange={(e) => setData('file', e.target.value)}
                                                maxLength={255}
                                                required={true}
                                            />
                                            <InputError message={errors.file} className="mt-2"/>
                                        </div>
                                    </div>
                                    <PrimaryButton
                                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                        processing={processing}>
                                        Download file
                                    </PrimaryButton>
                                </form>
                            </div>
                            <div className="col-span-2">
                                <form onSubmit={uploadFile}>
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                                        <div className="col-span-3">
                                            <p className={'text-lg text-gray-800 dark:text-white pb-2'}>Upload a
                                                file</p>
                                            <InputLabel forInput="save_as" value="Save as"/>
                                            <TextInput
                                                name="save_as"
                                                value={data.save_as}
                                                className="mt-1 block w-full"
                                                autoComplete="file"
                                                handleChange={(e) => setData('save_as', e.target.value)}
                                                maxLength={255}
                                                required={true}
                                            />
                                            <InputError message={errors.save_as} className="mt-2"/>
                                        </div>
                                        <div className="col-span-1">
                                            <p className={'text-lg text-gray-800 dark:text-white pb-2'}>&zwnj;</p>
                                            <label
                                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">File</label>
                                            <input
                                                type="file"
                                                className="w-full px-4 py-2"
                                                name="the_file"
                                                onChange={(e) =>
                                                    setData("the_file", e.target.files[0])
                                                }
                                            />
                                            <span className="text-red-600">{errors.the_file}</span>
                                        </div>
                                    </div>
                                    <PrimaryButton
                                        className="inline-flex items-center px-5 py-2.5 mt-3"
                                        processing={processing}>
                                        Upload file
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>
                        <ProgressBar value={uploadProgress}></ProgressBar>
                    </div>
                </section>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg mt-4">
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white pl-4 pt-2'>SFTP Command output</h1>
                    <div className="pt-2 px-4 mx-auto max-w-7xl">
                        {
                            (running) ? <p className={'text-gray-600 dark:text-gray-300 mb-2'}><code
                                className={'text-red-500 bg-gray-300 dark:bg-black p-1 rounded-md my-2'}>{data.the_command1 ?? null}</code> {(runTime / 1000) % 60}s
                            </p> : null
                        }
                    </div>
                    <div className="py-4 px-4 mx-auto max-w-7xl" id="command_output_div">
                        <span className="text-gray-400 dark:text-gray-500">Nothing run yet</span>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this SFTP Connection?
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
