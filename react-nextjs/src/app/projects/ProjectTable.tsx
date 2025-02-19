"use client"
import React from "react";
import { Popconfirm, Table, Divider } from "antd";
import Link from "next/link"
import type { TableProps } from "antd";
import { TableData } from "@/utils/model/AbstractModel";
import { ProjectData } from "@/utils/model/Project";

const columns: TableProps<ProjectData>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true
    },
    {
        title: "Environment",
        dataIndex: "env",
        sorter: true,
        filters: [
        {
            text: "test",
            value: "test",
        },
        {
            text: "live",
            value: "live",
        }
        ]
    },
  {
    title: "Action",
    key: "action",
    render: ( _: any, { id }: ProjectData ) => (
        <span>
            <Link href={ `/${ id }` }>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm placement="topRight" title="Are you sure to delete this record?"
                onConfirm={ () => removeRecord( id ) } okText="Yes" cancelText="No">
            <a href="#">Delete</a>
            </Popconfirm>
        </span>
    ),
  },
];

function removeRecord( id: number ){}

const ProjectTable = ({ dataSource }: { dataSource: TableData } ) => {

    return <Table<ProjectData> columns={ columns } dataSource={ dataSource.rows } />;
}

export default ProjectTable;