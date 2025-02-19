import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import useService, { normalizeFilters } from "~/Hooks/useService";
import ErrorBoundary  from "~/Components/ErrorBoundary";
import { Link } from "react-router-dom";
import { Table, Divider, Alert, Popconfirm, Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';

function cleanFetchParams( params ) {
    const data = structuredClone( params );
    // total changes on the first fetch and causes second fetch
    delete data.pagination.total;
    return JSON.stringify( data );
}

const UiTable = forwardRef(({ ref, columns, api, baseUrl, prefetchedData, 
    getColumnSearchProps = null, 
    enableSelection = false, 
    footer = null,
    actionsBaseUrl = null,
    // use when table needs to be filtered regardless of user choice
    defaultTableParams = {} // e.g. { filters: { "DATE(createdAt)": dayjs( new Date() ).format( "YYYY-MM-DD" ) } }
}) => {

    const {
        loading,
        error,
        data,
        setData,
        tableParams,
        setTableParams,
        fetchData,
        setLoading
    } = useService({ api, prefetchedData, defaultTableParams }),

        [ selectedRowKeys, setSelectedRowKeys ] = useState( [] ),

        _actionsBaseUrl = actionsBaseUrl ?? baseUrl,


        renderActions = {              
            EditDelete: ( text, record ) => (
                <span>
                    <Link to={ `${ _actionsBaseUrl }/${ record.id }` }>Edit</Link>
                    <Divider type="vertical" />
                    <Popconfirm placement="topRight" title="Are you sure to delete this record?"
                        onConfirm={ () => removeRecord( record.id ) } okText="Yes" cancelText="No">
                    <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),

            Delete: ( text, record ) => (
                <span>
                    <Popconfirm placement="topRight" title="Are you sure to delete this record?"
                        onConfirm={ () => removeRecord( record.id ) } okText="Yes" cancelText="No">
                    <a href="#">Delete</a>
                    </Popconfirm>
                </span>
            ),

            View: ( text, record ) => (
                <span>
                    <Link to={ `${ _actionsBaseUrl }/${ record.id }` }>View</Link>                
                </span>
            ),
        }, 

        rowClassName = ( record ) => ( "active" in record ) ? ( record.active ? "" : "is-demoted" ) : "",

        removeRecord = ( id ) => {
            api.remove( id );
            fetchData( tableParams );
        },

        removeSelected = async () => {
            try {
                setLoading( true );
                await api.removeSelected( selectedRowKeys );                
                setSelectedRowKeys([]);
                fetchData( tableParams );
            } catch ( err ) {
                console.error( err );
                throw err.exception === "Doctrine\\DBAL\\Exception\\ForeignKeyConstraintViolationException" ? err 
                    : new Error(  "You cannot delete this record" );
            } finally {
                setLoading( false );
            }
        },

        toolbar = () => {
            return (
                <div className="table-footer-btns">
                <Link to={ `${ _actionsBaseUrl }/0` }><Button><PlusOutlined /> Add record</Button></Link>
                { ( selectedRowKeys && selectedRowKeys.length ) ? <Button onClick={ () => removeSelected() } disabled={ loading } >
                    Delete { selectedRowKeys.length } selected
                </Button> : null }
                </div>
            );
        },

        onTableChange = ( pagination, filters, sorter ) => {
            setTableParams({
                pagination,
                filters: Object.assign( defaultTableParams.filters ?? {}, normalizeFilters( filters ) ?? {} ),
                sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
                sortField: Array.isArray(sorter) ? undefined : sorter.field,
            });

            // `dataSource` is useless since `pageSize` changed
            if ( pagination.pageSize !== tableParams.pagination?.pageSize ) {
                setData([]);
            }
        },
        rowSelection = enableSelection ? {
            rowSelection: {
              selectedRowKeys,
              onChange: selectedRowKeys => setSelectedRowKeys( selectedRowKeys ),
          }}: {};

    // Animate columns
    let columnsExt = columns.map( c => {
        // define like { title: "Actions", key: "action", actions: "EditDelete" } without render
        if ( typeof c.actions !==  "undefined" && typeof c.render === "undefined" ) {
            if ( !( c.actions in renderActions ) ) {
                throw new Error( `Cannot find action "${ c.actions }"` );
            }
            c.render = renderActions[ c.actions ];
        }      
        
        // defined like { getColumnSearchProps: "slug" }
        if ( c.getColumnSearchProps && typeof c.getColumnSearchProps !== "function" ) {
            c = Object.assign( c, getColumnSearchProps( c.getColumnSearchProps ));
        }
        return c;
    });

    // Expose method to the the parent component
    useImperativeHandle( ref, () => {
        return {
            // param to merge with existing table params    
            setTableParams: ( params = {} ) => {            
                setTableParams({ ...{
                        pagination: tableParams.pagination,                    
                        sortOrder: tableParams.sortOrder,
                        sortField: tableParams.sortField,
                        ...params
                    },
                    filters: Object.assign( defaultTableParams.filters ?? {}, tableParams.filters ?? {}, params.filters ?? {} )
                });
            }
        };
    }, []);

    useEffect(() => {
        fetchData( tableParams );
    }, [ cleanFetchParams( tableParams ) ]);
    
    return ( <ErrorBoundary>

        { error ? <Alert
            message="Error"
            description={ error.message }
            type="error"
        /> : null } 

        <Table
            sticky={ true }
            columns={ columnsExt }
            { ...rowSelection }
            rowKey={ record => record.id }
            dataSource={ data }
            pagination={ tableParams.pagination }
            loading={ loading }
            onChange={ onTableChange }
            footer={ footer ?? toolbar }
            rowClassName={ rowClassName }
            className="admin-table"
            tableLayout="auto"
        />

    </ErrorBoundary> );
}); 

UiTable.displayName = "UiTable";
export default UiTable;
