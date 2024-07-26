import React, { useState, useEffect } from "react";
import useService from "~/Hooks/useService";
import ErrorBoundary  from "~/Components/ErrorBoundary";
import { Link } from "react-router-dom";
import { Table, Divider, Alert, Popconfirm } from "antd";
import { useSelector } from "react-redux";

function cleanFetchParams( params ) {
    const data = { ...params };
    // total changes on the first fetch and causes second fetch
    data.pagination.total = null;
    return JSON.stringify( data );
}

export default function UiTable({ columns, api, table }) {

    const {
        loading,
        error,
        data,
        tableParams,
        setTableParams,
        fetchData,
    } = useService( api.collection, useSelector( ( state ) => state.app.tables[ table ] ) );
   
  
    const renderActions = ( text, record ) => (
        <span>
            <Link to={ `${ api.collection }/${ record.id }` }>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm placement="topRight" title="Are you sure to delete this record?"
                onConfirm={ () => removeRecord( record.id ) } okText="Yes" cancelText="No">
            <a href="#">Delete</a>
            </Popconfirm>
        </span>
    );

     let columnsExt = [ ...columns, {
        title: "Actions",
        key: "action",
        width: "120px",
        render: renderActions
    }];


    const removeRecord = ( id ) => {
        props?.removeRecord();
        this.api.remove( id );
        fetchData( tableParams );
    };

    const handleTableChange = ( pagination, filters, sorter ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    useEffect(() => {
        fetchData();
    }, [ cleanFetchParams( tableParams ) ]);

    return ( <ErrorBoundary>

        { error ? <Alert
            message="Error"
            description={ error.message }
            type="error"
        /> : null } 

        <Table
            columns={ columnsExt }
            rowKey={ record => record.id }
            dataSource={ data }
            pagination={ tableParams.pagination }
            loading={ loading }
            onChange={ handleTableChange }
        />
    </ErrorBoundary> );
}; 