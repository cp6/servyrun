import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import React, {useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import {HiFolderOpen, HiServer} from "react-icons/hi";
import BackButton from "@/Components/BackButton";
import TealButton from "@/Components/TealButton";
import ProgressBar from "@/Components/ProgressBar";
import axios from "axios";

export default function CreateDownload({auth}) {

    const resource = usePage().props.resource;
    const alert = usePage().props.alert;

    const {data, setData, post, processing, reset, errors} = useForm({
        filepath: '',
        save_as: ''
    });

    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(null);

    async function getDownloadProgressValue(resource) {
        const result = await axios.get(route('sftp.download-to-server.progress', resource.id));
        return await result.data;
    }

    useEffect(() => {
            let interval;
            const config = {'Cache-Control': 'no-cache'};
            if (downloading) {
                interval = setInterval(() => {
                    getDownloadProgressValue(resource).then((the_response) => {
                        setDownloadProgress(the_response.progress);
                    })
                }, 500);
            } else if (!downloading) {
                setDownloadProgress(null);
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [downloading]
    );
    const submit = (e) => {
        e.preventDefault();

        post(route('sftp.download-to-server', resource.id), {
            onStart: (startEvent) => {
                setDownloading(true);
            },
            onFinish: (finishEvent) => {
                setDownloading(false);
            }
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Download file to surcuri</h2>}
        >
            <Head title={"Download file to surcuri"}/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('sftp.show', resource.id)}>Back to SFTP connection</BackButton>
                    <TealButton href={route('downloaded.index')}><HiFolderOpen className="mr-2 h-5 w-5"/>Downloaded
                        files</TealButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-6 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Download file from SFTP to
                                this surcuri host</h1>
                            <small className="text-end">
                                <HiServer
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('server.show', resource.server.id)}
                                    title={'Go to server'}/>
                            </small>
                        </div>
                        <form onSubmit={submit}>
                            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">
                                <div className="md:col-span-4 col-span-6">
                                    <InputLabel forInput="filepath" value="Full file path and name"/>
                                    <TextInput
                                        name="filepath"
                                        value={data.filepath}
                                        className="mt-1 block w-full"
                                        autoComplete="filepath"
                                        handleChange={(e) => setData('filepath', e.target.value)}
                                        maxLength={255}
                                    />
                                    <InputError message={errors.filepath} className="mt-2"/>
                                </div>
                                <div className="md:col-span-2 col-span-6">
                                    <InputLabel forInput="save_as"
                                                value="Save as (leave empty to use original filename"/>
                                    <TextInput
                                        name="save_as"
                                        value={data.save_as}
                                        className="mt-1 block w-full"
                                        autoComplete="save_as"
                                        handleChange={(e) => setData('save_as', e.target.value)}
                                        maxLength={64}
                                    />
                                    <InputError message={errors.save_as} className="mt-2"/>
                                </div>
                            </div>
                            <PrimaryButton
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                processing={processing}>
                                Download
                            </PrimaryButton>
                        </form>
                        <ProgressBar value={downloadProgress}></ProgressBar>
                    </div>
                </section>
            </div>

        </AuthenticatedLayout>
    );
}
