import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/inertia-react';
import {Button, Modal, Select} from "flowbite-react";
import React, {useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ReactDOM from "react-dom/client";
import Output from "@/Components/Output";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";
import {HiPencil, HiQuestionMarkCircle, HiServer, HiTrash} from "react-icons/hi";

export default function Show({auth, resource, ip, method, commands, alert_type, alert_message}) {

    const [isEmailChecked, setIsEmailChecked] = useState(false);

    const [runTime, setRunTime] = useState(0);
    const [running, setRunning] = useState(false);

    const handleEmailChange = event => {
        setIsEmailChecked(event.target.checked);
        data.email = event.target.checked;
    };

    const {data, setData, post, processing, reset, errors} = useForm({
        the_command1: '',
        command_id: '',
        timeout: '10',
        email: ''
    });

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


    const [showModal, setShowModal] = useState(false);

    const [hasAlert, setHasAlert] = React.useState(true);

    async function postData() {
        setRunTime(0);
        setRunning(true);
        const response = await fetch(route('connection.run', resource.id), {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                'the_command1': data.the_command1,
                'command_id': data.command_id || null,
                'timeout': data.timeout || 10,
                'email': data.email || false
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

            const the_output = <Output id='commandOutput' title={null} the_command={the_response.the_command}
                                       created_at={new Date()}
                                       the_output={the_response.output ?? the_response.message}
                                       seconds={the_response.seconds_taken}
                                       rows={10}></Output>

            root.render(the_output);

            setData('command_id', '');
        });

    };

    const deleteItem = () => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
            }
        };

        fetch(route('connection.destroy', resource.id), requestOptions).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.username}@{ip}:{resource.ssh_port} ({resource.server.hostname})
                with
                a {method.string}</h2>}
        >
            <Head title={"Connection " + resource.id}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('connection.index')}>Back to connections</BackButton>
                </div>
                <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                               alert_message={alert_message}></ResponseAlert>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="py-4 px-4 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Run command</h1>
                            <small className="text-end">
                                <HiTrash
                                    className="mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer"
                                    onClick={() => setShowModal(true)} title={'Delete connection'}/>
                                <HiPencil
                                    className="md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('connection.edit', resource.id)}
                                    title={'Edit connection'}/>
                                <HiServer
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('server.show', resource.server.id)}
                                    title={'Go to server'}/>
                                <HiQuestionMarkCircle
                                    className="md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer"
                                    onClick={event => window.location.href = route('connection.debug', resource.id)}
                                    title={'Debug connection'}/>
                            </small>
                        </div>
                        <form onSubmit={submit}>
                            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4">
                                <div className="sm:col-span-4 col-span-4">
                                    <InputLabel forInput="the_command1" value="Command"/>
                                    <TextInput
                                        name="the_command1"
                                        value={data.the_command1}
                                        className="mt-1 block w-full"
                                        autoComplete="the_command1"
                                        handleChange={(e) => setData('the_command1', e.target.value)}
                                        maxLength={64}
                                    />
                                    <InputError message={errors.the_command1} className="mt-2"/>
                                </div>
                                <div className="sm:col-span-2 col-span-4">
                                    <div className="mb-2 block">
                                        <InputLabel forInput="command_id" value="From commands"/>
                                    </div>
                                    <Select onChange={(e) => setData('command_id', e.target.value)}
                                            name="command_id"
                                            value={data.command_id}
                                            handleChange={(e) => setData('command_id', e.target.value)}
                                    >
                                        <option value=''>Choose</option>
                                        {commands.map(commands => <option key={commands.id}
                                                                          value={commands.id}>{commands.title}</option>)}
                                    </Select>
                                </div>
                                <div className="sm:col-span-1 col-span-4">
                                    <InputLabel forInput="timeout" value="Timeout"/>
                                    <TextInput
                                        type='number'
                                        name="timeout"
                                        className="mt-1 block w-full"
                                        autoComplete="timeout"
                                        value={data.timeout}
                                        handleChange={(e) => setData('timeout', e.target.value)}
                                        min={1}
                                        max={999999}
                                    />
                                    <InputError message={errors.timeout} className="mt-2"/>
                                </div>
                                <div className="sm:col-span-1 col-span-4">
                                    <InputLabel forInput="email" value="Send output to email"/>
                                    <input
                                        type="checkbox"
                                        name="email"
                                        value={isEmailChecked ? 1 : 0}
                                        onChange={handleEmailChange}
                                        checked={isEmailChecked}
                                    />
                                    <InputError message={errors.email} className="mt-2"/>
                                </div>
                            </div>
                            <PrimaryButton
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
                                processing={processing}>
                                Run
                            </PrimaryButton>
                        </form>
                    </div>
                </section>
                <section className="bg-white/50 dark:bg-gray-700 rounded-lg mt-4">
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white pl-4 pt-2'>Command output</h1>
                    <p className='pl-4 text-gray-700 dark:text-gray-300'><a
                        href={route('outputs.show.server', resource.server.id)}>View all</a>
                    </p>
                    <div className="pt-2 px-4 mx-auto max-w-7xl">
                        {
                            (running) ? <p className={'text-gray-600 dark:text-gray-300 mb-2'}><code className={'text-red-500 bg-gray-300 dark:bg-black p-1 rounded-md my-2'}>{data.the_command1 ?? null}</code> {(runTime / 1000) % 60}s</p> : null
                        }
                    </div>
                    <div className="py-4 px-4 mx-auto max-w-7xl" id="command_output_div">
                        <span className="text-gray-400 dark:text-gray-500">No output yet</span>
                    </div>
                </section>
            </div>

            <Modal show={showModal} size="md">
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Connection?
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
