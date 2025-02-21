"use client"
import React from "react";
import { Popconfirm, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link"
import type { TableProps } from "antd";
import { ProjectData } from "@/utils/model/Project";
import UiTable from "@/ui/UiTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove } from "@/utils/api";
import { PAGE_PROJECTS } from "@/utils/constants";


const ProjectTable = () => {

    const queryClient = useQueryClient(),
          mutation = useMutation({
            mutationFn: ( id: number ) => remove( PAGE_PROJECTS, id ),
            onSuccess: () => {
                return queryClient.invalidateQueries({ queryKey: [ PAGE_PROJECTS ] });
            },
        });

    const columns: ColumnsType<ProjectData> = [
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
                        onConfirm={ () => mutation.mutate( id ) } okText="Yes" cancelText="No">
                    <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];

   

    return <UiTable<ProjectData> columns={ columns } />;
}

export default ProjectTable;