import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import BackButton from "@/Components/BackButton";
import Chart from "react-apexcharts";
import {format} from "date-fns";
import IndigoButton from "@/Components/IndigoButton";

export default function Cpu({auth}) {

    const resource = usePage().props.resource;
    const usage = usePage().props.usage;
    const high = usePage().props.high_24h;

    const time = usage.map((d) => format(new Date(d.created_at), 'hh:mma do LLL yyyy'));
    const usage_values = usage.map((value) => Math.round(value.cpu_usage * 10));

    const data = {
        series: [
            {
                name: "CPU usage %",
                data: usage_values
            }
        ],
        options: {
            chart: {
                id: "usage",
                parentHeightOffset: 0,
                toolbar: {
                    show: false,
                }
            },
            stroke: {
                curve: 'smooth',
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            grid: {
                borderColor: 'rgba(139,151,142,0.15)',
                padding: {
                    left: -2,
                    right: -20,
                    bottom: -30
                }
            },
            fill: {
                colors: ['#2864d3'],
                opacity: 0.5
            },
            colors: ['#2e72ea'],
            xaxis: {
                categories: time,
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tickAmount: 60
            },
            yaxis: [
                {
                    seriesName: "Usage",
                    title: {
                        text: 'Usage %',
                        show: false
                    },
                    labels: {
                        show: false,
                        offsetX: -30,
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    opposite: true,
                    min: 0,
                    max: 100,
                }
            ]
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.title + ' CPU usage'}</h2>}
        >
            <Head title={"CPU usage " + resource.hostname}/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('server.show', resource.id)}>Back to server</BackButton>
                    <IndigoButton href={route('server.usage.ram', resource.id)}>RAM</IndigoButton>
                    <IndigoButton href={route('server.usage.disk', resource.id)}>Disk</IndigoButton>
                </div>

                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <p className="p-2 text-gray-700 dark:text-gray-400">Highest usage past
                        24H: {Math.round(high.cpu_usage * 10)} at {format(new Date(high.created_at), 'hh:mma')}</p>
                    <div className="w-full">
                        <Chart
                            options={data.options}
                            series={data.series}
                            type="area"
                            width="100%"
                            height="400px"
                        />
                    </div>
                </section>
            </div>

        </AuthenticatedLayout>
    );
}
