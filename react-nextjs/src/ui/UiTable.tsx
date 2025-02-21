import React, { useState, useEffect } from "react";
import { Table, Alert, Button } from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { AnyObject, TableData } from "@/utils/type";
import { getList } from "@/utils/api";
import Link from "next/link"
import queryString from "query-string";


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
    { columns }: 
    { 
        columns: TableProps<RecordType>["columns"]
    }
) => {

    const [ getQuery, setGetQuery ] = useState( "" );

    const { data, isLoading, error, refetch } = useQuery<TableData>({
                queryKey: [ "projects" ],
                queryFn: () => getList( "projects" + getQuery ),
                staleTime: 1000 * 3
        });


    const [ pagination, setPagination ] = useState<TablePagination>({
        current: 1,
        pageSize: 10,
        total: data?.total
    });  

    const onTableChange: TableProps<RecordType>["onChange"] = ( 
        { current = 1, pageSize = 10 }, filters, sorter
    ) => {
        setPagination({
            current,
            pageSize,
            total: data?.total
        });

        // `sorter` can be either:
        // A single sorting object (SorterResult<RecordType>)
        // An array of sorting objects (SorterResult<RecordType>[])
        const sortOrder = Array.isArray( sorter ) ? sorter[ 0 ]?.order : sorter?.order,
              sortField = Array.isArray( sorter ) ? sorter[ 0 ]?.field : sorter?.field;

        
        setGetQuery( `?` + queryString.stringify({ 
            current, 
            pageSize, 
            sortOrder: normalizeOrder( sortOrder ?? null ), 
            sortField: sortField ?? null  
        }));
            
    };

    const footer = () => (
        <div className="table-footer-btns">
            <Link href={ `projects/0` }><Button><PlusOutlined /> Add record</Button></Link>
        </div>
    );    

    useEffect(() => {     
        getQuery && refetch();
    }, [ getQuery ]);

    useEffect(() => {     
        setPagination({ ...pagination, total: data?.total });
    }, [ JSON.stringify( data ) ]);


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