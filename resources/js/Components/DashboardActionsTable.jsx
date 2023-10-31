import React from "react";
import {format} from "date-fns";
import {Table} from "flowbite-react/lib/esm/components/Table";

export default function DashboardActionsTable({data}) {

    return (
        <Table className='px-4'>
            <Table.Head className='bg-gray-200 dark:bg-gray-900 rounded-none'>
                <Table.HeadCell
                    className={'dark:bg-gray-600 bg-gray-200 text-gray-900 dark:text-gray-100 group-first/head:first:rounded-none'}>
                    When
                </Table.HeadCell>
                <Table.HeadCell className={'dark:bg-gray-600 bg-gray-200 text-gray-900 dark:text-gray-100'}>
                    Resource
                </Table.HeadCell>
                <Table.HeadCell className={'dark:bg-gray-600 bg-gray-200 text-gray-900 dark:text-gray-100'}>
                    Action
                </Table.HeadCell>
                <Table.HeadCell
                    className={'dark:bg-gray-600 bg-gray-200 text-gray-900 dark:text-gray-100 overflow-x-scroll w-40 group-first/head:last:rounded-none'}>
                    Message
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {data.map(
                    RecentActions =>
                        <Table.Row key={RecentActions.id}
                                   className="bg-white dark:border-gray-800 dark:bg-gray-700">
                            <Table.Cell
                                className={'whitespace-nowrap font-medium text-gray-700 dark:text-gray-200'}>
                                {format(new Date(RecentActions.created_at), "hh:mm:ssa do LLL yyyy")}
                            </Table.Cell>
                            <Table.Cell
                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {RecentActions.resource_type}
                            </Table.Cell>
                            <Table.Cell
                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {RecentActions.action}
                            </Table.Cell>
                            <Table.Cell
                                className="whitespace-nowrap font-medium text-gray-900 dark:text-white overflow-x-scroll w-40">
                                {RecentActions.message}
                            </Table.Cell>
                        </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}
