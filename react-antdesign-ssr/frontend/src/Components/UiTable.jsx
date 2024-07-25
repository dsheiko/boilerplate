import React, { useState, useEffect } from "react";
import useService from "~/Hooks/useService";
import ErrorBoundary  from "~/Components/ErrorBoundary";
import { Link } from "react-router-dom";
import { Table, Divider, Alert, Popconfirm } from "antd";

function cleanFetchParams( params ) {
    const data = { ...params };
    // total changes on the first fetch and causes second fetch
    data.pagination.total = null;
    return JSON.stringify( data );
}

export default function UiTable( props ) {

    const {
        loading,
        error,
        data,
        tableParams,
        setTableParams,
        fetchData,
    } = useService( props.api.collection );
   
    const renderActions = ( text, record ) => (
        <span>
            <Link to={ `${ props.api.collection }/${ record.id }` }>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm placement="topRight" title="Are you sure to delete this record?"
                onConfirm={ () => removeRecord( record.id ) } okText="Yes" cancelText="No">
            <a href="#">Delete</a>
            </Popconfirm>
        </span>
    );

     let columns = [ ...props.columns, {
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
            columns={ columns }
            rowKey={ record => record.id }
            dataSource={ data?.rows }
            pagination={ tableParams.pagination }
            loading={ loading }
            onChange={ handleTableChange }
        />
    </ErrorBoundary> );
}; 