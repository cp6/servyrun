import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React, {useState} from "react";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import ResponseAlert from "@/Components/Alert";
import BackButton from "@/Components/BackButton";
import TealButton from "@/Components/TealButton";
import axios from "axios";
import {HiPlay} from "react-icons/hi";
import {numberFormat} from "@/helpers";

export default function FromTo({auth}) {

    const alert = usePage().props.alert;
    const pings = usePage().props.pings;
    const minPing = usePage().props.minPing;
    const maxPing = usePage().props.maxPing;
    const avgPing = usePage().props.avgPing;

    const user = usePage().props.auth.user;

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const runPing = () => {
        setButtonsDisabled(true);

        const config = {
            headers: {Authorization: `Bearer ${user.api_token}`}
        };

        axios.get(route('run.ping-from-to', [pings[0].from_server.id, pings[0].to_server.id]), config).then(response => {
            window.location.reload();
        }).catch(err => {
            console.log('Error running ping');
            setButtonsDisabled(false);
        });

    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{"Pings from " + pings[0].from_server.hostname + " to " + pings[0].to_server.hostname}</h2>}>
            <Head title={"Pings from " + pings[0].from_server.hostname + " to " + pings[0].to_server.hostname}/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('ping.index')}>Pings</BackButton>
                    <TealButton onClick={runPing} disabled={buttonsDisabled}><HiPlay className="mr-2 h-5 w-5"/>Run this
                        ping</TealButton>
                </div>
                <ResponseAlert details={alert}></ResponseAlert>
                <div className={'grid grid-cols-2 pb-2'}>
                    <div className={'col md:col-span-1 col-span-2'}>
                        <h2 className={'font-medium text-gray-900 dark:text-gray-300'}>From: <b><a
                            href={route('ip.show', pings[0].from_server.ip_ssh.id)}>{pings[0].from_server.ip_ssh.ip}</a></b> To: <b><a
                            href={route('ip.show', pings[0].to_server.ip_ssh.id)}>{pings[0].to_server.ip_ssh.ip}</a></b>
                        </h2>
                    </div>
                    <div className={'col md:col-span-1 col-span-2 md:text-end'}>
                        <h2 className={'font-medium text-gray-900 dark:text-gray-300'}>Average: <b>{numberFormat(avgPing)}</b> Lowest: <b>{minPing}</b> Highest: <b>{maxPing}</b>
                        </h2>
                    </div>
                </div>
                <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 rounded-lg">
                    {
                        pings.length === 0
                            ?
                            <h2 className={'text-md p-2 font-semibold leading-none text-yellow-500 md:text-lg dark:text-yellow-400'}>No
                                pings yet</h2>
                            :
                            <Grid
                                data={pings}
                                columns={[
                                    {
                                        id: "from_server_id",
                                        name: "From",
                                        sort: false,
                                        data: (row) => (row.from_server) ? html(`<a href='${route('server.show', row.from_server.id)}'>${row.from_server.hostname}</a>`) : null,
                                    },
                                    {
                                        id: "server_id",
                                        name: "To",
                                        sort: true,
                                        data: (row) => (row.to_server) ? html(`<a href='${route('server.show', row.to_server.id)}'>${row.to_server.hostname}</a>`) : null,
                                    },
                                    {
                                        id: "was_up",
                                        name: "Up",
                                        sort: true,
                                        formatter: (cell) => (cell === 1) ? 'Y' : 'N'
                                    },
                                    {
                                        id: "avg",
                                        name: "AVG",
                                        sort: true
                                    },
                                    {
                                        id: "min",
                                        name: "MIN",
                                        sort: true
                                    },
                                    {
                                        id: "max",
                                        name: "MAX",
                                        sort: true
                                    },
                                    {
                                        id: "created_at",
                                        name: "Datetime",
                                        sort: true,
                                        formatter: (cell) => (format(new Date(cell), "yyyy-MM-dd HH:mm:ss"))
                                    }
                                ]}
                                search={false}
                                className={gridJsTableStyling}
                                pagination={GridJsPagination}
                            />
                    }
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
