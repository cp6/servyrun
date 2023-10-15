import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import React, {useEffect} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ResponseAlert from "@/Components/Alert";
import axios from "axios";
import Prism from "prismjs";
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-textile';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-log';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import UpdateButton from "@/Components/UpdateButton";
import BackButton from "@/Components/BackButton";
import {numberFormat} from "@/helpers";


export default function Read({auth}) {

    const resource = usePage().props.resource;
    const alert = usePage().props.alert;

    const {data, setData, post, processing, reset, errors} = useForm({
        file: ''
    });

    const [codeContent, setCodeContent] = React.useState(null);

    const [secretCodeContent, setSecretCodeContent] = React.useState(null);

    const [filePath, setFilePath] = React.useState(null);

    const [fileSize, setFileSize] = React.useState(null);

    const [fileExt, setFileExt] = React.useState(null);

    const [editable, setEditable] = React.useState(false);

    async function postData() {

        const response = await fetch(route('sftp.read.file', resource.id), {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                'file': data.file
            })
        });

        return response.json();
    }

    const submit = (e) => {
        e.preventDefault();

        const createOutput = postData().then((the_response) => {

            setCodeContent(the_response.contents);
            setSecretCodeContent(the_response.contents);
            setFilePath(the_response.file);
            setFileExt(the_response.extension);

            if (the_response.size > 800000) {//Over 800kb do NOT allow editing
                setEditable(false);
            } else {
                setEditable(true);
            }

            setFileSize(numberFormat(the_response.size / 1000 / 1000));

        });

    };

    const submitForRaw = (e) => {
        e.preventDefault();
        fetch(route('sftp.read.file.raw.post', resource.id), {
            method: 'POST',
            body: JSON.stringify({
                'file': data.file
            }),
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
        }).then((response) => response.json())
            .then((data) => {
                window.location.replace(route('sftp.read.file.raw', [resource.id, data.request]));
            })
            .catch((err) => {
                console.log('Error submitting');
            });
    };

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const sendContents = () => {
        const codeForUpload = {save_as: filePath, contents: secretCodeContent};

        axios.post(route('sftp.overwrite', resource.id), codeForUpload).then(response => {
            console.log('POSTed update');
        }).catch(err => {
            console.log('Error POSTing update');
        });
    };

    const handleCodeChange = (event) => {
        setSecretCodeContent(event.target.firstChild.innerText);
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Read file
                SFTP {resource.server.hostname})</h2>}
        >
            <Head title={"Read file " + resource.id}/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('sftp.show', resource.id)}>Back to SFTP connection</BackButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white pl-4 pt-2'>Read a file</h1>
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="grid gap-2 grid-cols-4 sm:gap-4">
                            <div className="md:col-span-2 col-span-4">
                                <form onSubmit={submit}>
                                    <InputLabel forInput="file" value="Full file path"/>
                                    <TextInput
                                        name="the_file"
                                        value={data.file}
                                        className="mt-1 block w-full"
                                        autoComplete="file"
                                        handleChange={(e) => setData('file', e.target.value)}
                                        maxLength={64}
                                    />
                                    <InputError message={errors.file} className="mt-2"/>
                                    <PrimaryButton
                                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
                                        processing={processing}>
                                        Read
                                    </PrimaryButton>
                                </form>
                            </div>
                            <div className="md:col-span-2 col-span-4">
                                <form onSubmit={submitForRaw}>
                                    <InputLabel forInput="file" value="Full file path"/>
                                    <TextInput
                                        name="the_file"
                                        value={data.file}
                                        className="mt-1 block w-full"
                                        autoComplete="file"
                                        handleChange={(e) => setData('file', e.target.value)}
                                        maxLength={64}
                                    />
                                    <InputError message={errors.file} className="mt-2"/>
                                    <PrimaryButton
                                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800"
                                        processing={processing}>
                                        Read as raw
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg mt-2 py-2">
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white pl-4 pt-2'>File contents</h1>
                    {filePath !== null ?
                        <p className='text-md text-gray-700 dark:text-gray-300 pl-4 pt-2'>{filePath}</p> : null}
                    {fileSize !== null ?
                        <p className='text-md text-gray-600 dark:text-gray-400 pl-4 pt-2'>{fileSize}MB</p> : null}
                    <div className="py-6 pl-2 mx-auto max-w-7xl lg:pb-8 h-96 overflow-scroll" id="command_output_div">
                        <div className="Code line-numbers">
                            <pre contentEditable={editable} onChange={handleCodeChange} onInput={handleCodeChange}><code
                                id={'codeTag'} className={`language-${fileExt}`}>{codeContent}</code></pre>
                        </div>
                    </div>
                    <UpdateButton onClick={sendContents} className={'ml-2'}>Update file</UpdateButton>
                </section>
            </div>

        </AuthenticatedLayout>
    );
}
