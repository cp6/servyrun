import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import {Transition} from '@headlessui/react';
import {Select} from "flowbite-react";
import React from "react";
import UpdateButton from "@/Components/UpdateButton";

export default function UpdateProfileInformation({mustVerifyEmail, status, className}) {
    const user = usePage().props.auth.user;

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm({
        name: user.name,
        email: user.email,
        api_token: user.api_token,
        login_ip_only: user.login_ip_only,
        api_ip_only: user.api_ip_only,
        check_uptime_server_index: 1,
        check_uptime_connection_index: 1,
        check_uptime_sftp_connection_index: 1,
        check_uptime_db_connection_index: 1,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's username, email and settings.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-6 sm:gap-4">
                    <div className="md:col-start-1 md:col-end-5 col-span-4 mb-2">
                        <InputLabel for="api_token" value="API key"/>

                        <TextInput
                            id="api_token"
                            className="mt-1 block w-full"
                            value={data.api_token}
                            handleChange={(e) => setData('api_token', e.target.value)}
                            disabled={true}
                            autoComplete="api_token"
                        />

                        <InputError className="mt-2" message={errors.api_token}/>
                    </div>

                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="login_ip_only" value="Login allowed from this IP address only"/>

                        <TextInput
                            id="login_ip_only"
                            className="mt-1 block w-full"
                            value={data.login_ip_only}
                            handleChange={(e) => setData('login_ip_only', e.target.value)}
                            autoComplete="login_ip_only"
                        />

                        <InputError className="mt-2" message={errors.login_ip_only}/>
                    </div>

                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="api_ip_only" value="API access allowed from this IP address only"/>

                        <TextInput
                            id="api_ip_only"
                            className="mt-1 block w-full"
                            value={data.login_ip_only}
                            handleChange={(e) => setData('api_ip_only', e.target.value)}
                            autoComplete="api_ip_only"
                        />

                        <InputError className="mt-2" message={errors.api_ip_only}/>
                    </div>

                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="check_uptime_server_index" value="Check server uptime at servers index page"/>

                        <Select name="check_uptime_server_index"
                                value={data.check_uptime_server_index}
                                onChange={(e) => setData('check_uptime_server_index', e.target.value)}
                                handleChange={(e) => setData('check_uptime_server_index', e.target.value)}
                        >
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </Select>

                        <InputError className="mt-2" message={errors.check_uptime_server_index}/>
                    </div>


                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="check_uptime_connection_index"
                                    value="Check server uptime at servers index page"/>

                        <Select name="check_uptime_connection_index"
                                value={data.check_uptime_connection_index}
                                onChange={(e) => setData('check_uptime_connection_index', e.target.value)}
                                handleChange={(e) => setData('check_uptime_connection_index', e.target.value)}
                        >
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </Select>

                        <InputError className="mt-2" message={errors.check_uptime_connection_index}/>
                    </div>


                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="check_uptime_sftp_connection_index"
                                    value="Check server uptime at servers index page"/>

                        <Select name="check_uptime_sftp_connection_index"
                                value={data.check_uptime_sftp_connection_index}
                                onChange={(e) => setData('check_uptime_sftp_connection_index', e.target.value)}
                                handleChange={(e) => setData('check_uptime_sftp_connection_index', e.target.value)}
                        >
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </Select>

                        <InputError className="mt-2" message={errors.check_uptime_sftp_connection_index}/>
                    </div>


                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="check_uptime_db_connection_index"
                                    value="Check server uptime at servers index page"/>

                        <Select name="check_uptime_db_connection_index"
                                value={data.check_uptime_db_connection_index}
                                onChange={(e) => setData('check_uptime_db_connection_index', e.target.value)}
                                handleChange={(e) => setData('check_uptime_db_connection_index', e.target.value)}
                        >
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </Select>

                        <InputError className="mt-2" message={errors.check_uptime_db_connection_index}/>
                    </div>

                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="name" value="Username"/>

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            handleChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name}/>
                    </div>

                    <div className="sm:col-span-3 col-span-4 mb-2">
                        <InputLabel for="email" value="Email"/>

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            handleChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="email"
                        />

                        <InputError className="mt-2" message={errors.email}/>
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <UpdateButton processing={processing}>Update</UpdateButton>

                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-gray-600 dark:text-green-500 mt-2">Saved.</p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    );
}
