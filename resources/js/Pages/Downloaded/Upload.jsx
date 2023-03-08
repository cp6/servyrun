import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {Select} from "flowbite-react";
import React, {useEffect, useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";
import axios from "axios";
import ProgressBar from "@/Components/ProgressBar";

export default function Upload({auth}) {

    const alert = usePage().props.alert;
    const resource = usePage().props.resource;
    const connections = usePage().props.connections;

    const {data, setData, post, processing, reset, errors} = useForm({
        connection_id: '',
        save_as: resource.saved_as
    });

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);

    async function getUploadProgressValue(resource) {
        const result = await axios.get(route('downloaded.upload.progress', resource.id));
        return await result.data;
    }

    useEffect(() => {
            let interval;
            const config = {'Cache-Control': 'no-cache'};
            if (uploading) {
                interval = setInterval(() => {
                    getUploadProgressValue(resource).then((the_response) => {
                        setUploadProgress(the_response.progress);
                    })
                }, 500);
            } else if (!uploading) {
                setUploadProgress(null);
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [uploading]
    );

    const submit = (e) => {
        e.preventDefault();

        post(route('downloaded.upload', resource.id), {
            onStart: (startEvent) => {
                setUploading(true);
            },
            onFinish: (finishEvent) => {
                setUploading(false);
            }
        });
        //navigate(route('downloaded.show', resource.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Upload {resource.saved_as} to SFTP</h2>}
        >
            <Head title={"Upload " + resource.saved_as}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('downloaded.index')}>Back to downloaded files</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4">

                            <div className="sm:col-span-2 col-span-4">
                                <div className="mb-2 block">
                                    <InputLabel forInput="connection_id" value="SFTP connection"/>
                                </div>
                                <Select onChange={(e) => setData('connection_id', e.target.value)}
                                        name="connection_id"
                                        required={true}
                                        value={data.connection_id}
                                        handleChange={(e) => setData('connection_id', e.target.value)}
                                >
                                    <option value=''>Choose</option>
                                    {connections.map(conn => <option key={conn.id}
                                                                    value={conn.id}>{conn.username}@{conn.server.hostname} ({conn.server.title})</option>)}
                                </Select>
                            </div>

                            <div className="sm:col-span-4 col-span-4">
                                <InputLabel forInput="save_as" value="Save as"/>
                                <TextInput
                                    name="save_as"
                                    className="mt-1 block w-full"
                                    autoComplete="save_as"
                                    value={data.save_as}
                                    handleChange={(e) => setData('save_as', e.target.value)}
                                    maxLength={125}
                                    required={true}
                                />
                                <InputError message={errors.save_as} className="mt-2"/>
                            </div>
                        </div>
                        <PrimaryButton
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            processing={processing}>
                           Upload
                        </PrimaryButton>
                    </form>
                    <ProgressBar value={uploadProgress}></ProgressBar>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
