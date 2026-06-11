"use client"
import React, { useState, useEffect } from "react";
import { Table, Alert, Button } from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { AnyObject, TableData } from "@/utils/type";
import { getList } from "@/utils/api";
import Link from "next/link";

interface TablePagination {
    current: number;
    pageSize: number;
    total?: number | undefined;
}

function normalizeOrder( txt: string | null = null ): string | null {
    if ( !txt ) {
        return null;
    }
    return txt.toLowerCase() === "ascend" ? "ASC" : "DESC";
}

const UiTable = <RecordType extends AnyObject = AnyObject>(
    { columns, collection }:
    {
        columns: TableProps<RecordType>["columns"];
        collection: string;
    }
) => {

    const [ getQuery, setGetQuery ] = useState( "" );

    const { data, isLoading, error } = useQuery<TableData>( {
        queryKey: [ collection, getQuery ],
        queryFn: () => getList( collection + getQuery ),
        staleTime: 1000 * 3
    } );

    const [ pagination, setPagination ] = useState<TablePagination>( {
        current: 1,
        pageSize: 10,
        total: data?.total
    } );

    const onTableChange: TableProps<RecordType>["onChange"] = (
        { current = 1, pageSize = 10 }, _filters, sorter
    ) => {
        setPagination( {
            current,
            pageSize,
            total: data?.total
        } );

        const sortOrder = Array.isArray( sorter ) ? sorter[ 0 ]?.order : sorter?.order,
              sortField = Array.isArray( sorter ) ? sorter[ 0 ]?.field : sorter?.field;

        const qs = new URLSearchParams(
            Object.entries( { current, pageSize, sortOrder: normalizeOrder( sortOrder ?? null ), sortField: sortField ?? null } )
                .filter( ( entry ): entry is [ string, string | number ] => entry[ 1 ] !== null )
                .map( ( [ k, v ] ) => [ k, String( v ) ] )
        );
        setGetQuery( `?${ qs.toString() }` );
    };

    const footer = () => (
        <div className="table-footer-btns">
            <Link href={ `/${ collection }/0` } prefetch={ true }><Button><PlusOutlined /> Add record</Button></Link>
        </div>
    );

    useEffect( () => {
        setPagination( prev => ({ ...prev, total: data?.total }) );
    }, [ data?.total ] );

    return <>
        { error ? <Alert
            message="Error"
            description={ error.message }
            type="error"
        /> : null }
        <Table
            sticky={ true }
            loading={ isLoading }
            columns={ columns }
            footer={ footer }
            onChange={ onTableChange }
            pagination={ pagination }
            dataSource={ data ? data.rows : [] }
        />
    </>;
};

export default UiTable;
