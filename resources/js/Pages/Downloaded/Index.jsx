import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import {Grid} from "gridjs-react";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import {format} from "date-fns";
import {html} from "gridjs";

export default function Index({auth, downloads, hasAlert, alert_type, alert_message}) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Downloaded</h2>}>
            <Head title={'Downloaded'}/>
                <div className="py-8 px-2 mx-auto max-w-7xl lg:py-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                    </div>
                    <ResponseAlert has_an_alert={hasAlert} alert_type={alert_type}
                                   alert_message={alert_message}></ResponseAlert>
                    <section className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                    <Grid
                        data={downloads}
                        columns={[
                            {
                                id: "saved_as",
                                name: "Saved as",
                                sort: true
                            },
                            {
                                id: "size",
                                name: "Size MB",
                                sort: true,
                                formatter: (cell) => (cell !== null) ?  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format((cell / 1000 / 1000)) : null
                            },
                            {
                                id: "speed_mbps",
                                name: "DL speed Mbps",
                                sort: true,
                                formatter: (cell) => (cell !== null) ?  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(cell) : null
                            },
                            {
                                id: "filename",
                                name: "File"
                            },
                            {
                                id: "id",
                                name: "View",
                                sort: false,
                                formatter: (cell) => html(`<a class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" href=${route('downloaded.show', cell)}>View</a>`)
                            },
                            {
                                id: "created_at",
                                name: "Downloaded",
                                sort: true,
                                formatter: (cell) => (format(new Date(cell), "yyyy-MM-dd HH:mm:ss"))
                            }
                        ]}
                        search={true}
                        className={gridJsTableStyling}
                        pagination={GridJsPagination}
                    />
            </section>
                </div>
        </AuthenticatedLayout>
    );
}
