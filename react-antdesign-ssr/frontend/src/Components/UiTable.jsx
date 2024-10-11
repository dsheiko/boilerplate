import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useService from "~/Hooks/useService";
import ErrorBoundary  from "~/Components/ErrorBoundary";
import { Link, useNavigate } from "react-router-dom";
import { Table, Divider, Alert, Popconfirm, Button } from "antd";


function cleanFetchParams( params ) {
    const data = structuredClone( params );
    // total changes on the first fetch and causes second fetch
    delete data.pagination.total;
    return JSON.stringify( data );
}

export default function UiTable({ columns, api, table, baseUrl, prefetchedData }) {

    const {
        loading,
        error,
        data,
        setData,
        tableParams,
        setTableParams,
        fetchData,
    } = useService( api.collection, prefetchedData );

    const navigate = useNavigate();

    const renderActions = ( text, record ) => (
        <span>
            <Link to={ `${ baseUrl }/${ record.id }` }>Edit</Link>
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

    const onAddRow = () => {
        navigate( `${ baseUrl }/0` );
    };


    const removeRecord = ( id ) => {
        api.remove( id );
        fetchData( tableParams );
    };

    const handleTableChange = ( pagination, filters, sorter ) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if ( pagination.pageSize !== tableParams.pagination?.pageSize ) {
        setData([]);
        }
    };

    useEffect(() => {
        fetchData( tableParams );
    }, [ cleanFetchParams( tableParams ) ]);
    
    return ( <ErrorBoundary>

        { error ? <Alert
            message="Error"
            description={ error.message }
            type="error"
        /> : null } 

        <Button
            onClick={ onAddRow }
            type="primary"
            style={{
                marginBottom: 16,
            }}
        >
        Add a row
      </Button>
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

UiTable.propTypes = {
  columns: PropTypes.array, 
  api: PropTypes.object,
  table: PropTypes.string,
  baseUrl: PropTypes.string,
  fetchData: PropTypes.func
}; 