import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React, {useState} from "react";
import BackButton from "@/Components/BackButton";
import Chart from "react-apexcharts";
import {format} from "date-fns";

export default function Disk({auth}) {

    const resource = usePage().props.resource;
    const usage = usePage().props.usage;

    const time = usage.map((d) => format(new Date(d.created_at),  'hh:mma do LLL yyyy'));
    const usage_values = usage.map((value) => value.disk_used_percent);

    const data = {
        series: [
            {
                name: "Disk usage %",
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
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.title + ' Disk usage'}</h2>}
        >
            <Head title={"Disk usage " + resource.hostname}/>
            <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('server.index')}>Back to servers</BackButton>
                </div>

                <section className="bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm">
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
