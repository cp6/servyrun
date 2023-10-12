import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React, {useState} from "react";
import BackButton from "@/Components/BackButton";
import Chart from "react-apexcharts";
import {format} from "date-fns";
import IndigoButton from "@/Components/IndigoButton";

export default function All({auth}) {

    const resource = usePage().props.resource;
    const usage = usePage().props.usage;
    const user = usePage().props.auth.user;

    const time = usage.map((d) => format(new Date(d.datetime), 'hh:mma do LLL yyyy'));
    const send = usage.map((value) => value.tx_mb);
    const receive = usage.map((value) => value.rx_mb);

    const [showRefresh, setShowRefresh] = useState(true);

    const data = {
        series: [
            {
                name: "Send MB",
                data: send
            },
            {
                name: "Receive MB",
                data: receive
            }
        ],
        options: {
            chart: {
                id: "usage",
                parentHeightOffset: 0,
                toolbar: {
                    show: false,
                },
                foreColor: '#747474'
            },
            stroke: {
                curve: 'smooth',
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                borderColor: 'rgba(139,151,142,0.15)',
                padding: {
                    left: -2,
                    right: -20
                }
            },
            legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'bottom',
                horizontalAlign: 'center',
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400,
                formatter: undefined,
                inverseOrder: false,
                width: undefined,
                height: undefined,
                tooltipHoverFormatter: undefined,
                customLegendItems: [],
                offsetX: 0,
                offsetY: 0,
                labels: {
                    colors: undefined,
                    useSeriesColors: false
                },
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 0
                },
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            },
            fill: {
                colors: ['#d3282e', '#28d32b'],
                opacity: 0.5
            },
            colors: ['#ab171c', '#16a719'],
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
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">{resource.title + ' network usage'}</h2>}
        >
            <Head title={"Network usage " + resource.hostname}/>
            <div className="py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10">
                <div className="flex flex-wrap gap-2 mb-4">
                    <BackButton href={route('server.show', resource.id)}>Back to server</BackButton>
                    <IndigoButton href={route('server.usage.cpu', resource.id)}>CPU</IndigoButton>
                    <IndigoButton href={route('server.usage.ram', resource.id)}>RAM</IndigoButton>
                    <IndigoButton href={route('server.usage.disk', resource.id)}>Disk</IndigoButton>
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
