"use client"
import React from "react";
import { Popconfirm, Divider } from "antd";
import Link from "next/link"
import type { TableProps } from "antd";
import { ProjectData } from "@/utils/model/Project";
import UiTable from "@/ui/UiTable";
import { remove } from "@/utils/api";

const ProjectTable = () => {

    const columns: TableProps<ProjectData>["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: true
            },
            {
                title: "Environment",
                dataIndex: "env",
                sorter: true
            },
        {
            title: "Action",
            key: "action",
            render: ( _: any, { id }: ProjectData ) => (
                <span>
                    <Link href={ `/projects/${ id }` }>Edit</Link>
                    <Divider type="vertical" />
                    <Popconfirm placement="topRight" title="Are you sure to delete this record?"
                        onConfirm={ () => remove( "projects", id ) } okText="Yes" cancelText="No">
                    <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];

   

    return <UiTable<ProjectData> columns={ columns } />;
}

export default ProjectTable;