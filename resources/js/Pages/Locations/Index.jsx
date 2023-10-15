import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/inertia-react';
import React from "react";
import ResponseAlert from "@/Components/Alert";
import {Grid} from "gridjs-react";
import {html} from "gridjs";
import {GridJsPagination, gridJsTableStyling} from "@/gridJsConfig";
import AddButton from "@/Components/AddButton";
import ResourceEmptyText from "@/Components/ResourceEmptyText";
import FlexAddButtonDiv from "@/Components/FlexAddButtonDiv";

export default function Index({auth}) {

    const alert = usePage().props.alert;
    const locations = usePage().props.locations;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2
                className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Locations</h2>}>
            <Head title={'Locations'}/>
            <div className="py-4 sm:px-0 px-1 mx-auto max-w-7xl">
                <FlexAddButtonDiv href={route('location.create')} resource={'Location'}/>
                <ResponseAlert details={alert}></ResponseAlert>
                {
                    (locations.length > 0) ?
                        <section
                            className="pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg">
                            <Grid
                                data={locations}
                                columns={[
                                    {
                                        id: "city",
                                        name: "City",
                                        sort: true
                                    },
                                    {
                                        id: "country",
                                        name: "Country",
                                        sort: true
                                    },
                                    {
                                        id: "id",
                                        name: "Edit",
                                        data: (row) => (row.user_id != null) ? html(`<a class="text-blue-500 dark:text-blue-300" href='${route('location.edit', row.id)}'>Edit</a>`) : '',
                                    }
                                ]}
                                search={true}
                                className={gridJsTableStyling}
                                pagination={GridJsPagination}
                            />
                        </section>
                        :
                        <ResourceEmptyText className={'ml-2 pb-4'} resource={'Locations'}></ResourceEmptyText>
                }

            </div>
        </AuthenticatedLayout>
    );
}
