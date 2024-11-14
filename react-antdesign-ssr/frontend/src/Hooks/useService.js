import { useState } from "react";
import debounce from "lodash.debounce";

function isTableData( data ) {
  return "total" in data && "rows" in data;
}

function normalizeOrder( txt = "" ) {
  // with DEFAULT is desc
  return txt.toLowerCase().startsWith( "asc" ) ? "ASC" : "DESC";
}

export function normalizeFilters( filters ) {
  return filters ? Object.entries( filters ).reduce( ( carry, [ key, val ]) => {
    if ( typeof val === "string" ) {
      carry[ key ]=  val;
    }
    else if ( Array.isArray( val ) && val.length ) {
      carry[ key ]=  val.shift();
    }
    return carry;
  }, {}) : {};
}

function flatten( params ) {

  if ( !params || !( "pagination" in params ) ) {
    return params || {};
  }
  const { filters, sortField, sortOrder } = params,
        { current, pageSize } = params.pagination;

  return {
    filter: JSON.stringify( normalizeFilters( filters ) ),
    current,
    pageSize,
    sortField,
    sortOrder: ( sortOrder && sortField ) ? normalizeOrder( sortOrder ) : undefined
  };
}

export default function useService({ api, prefetchedData, defaultTableParams }) {
  const [ loading, setLoading ] = useState( false ),
        [ error, setError ] = useState( null ),
        [ data, setData ] = useState( prefetchedData?.rows ),
        [ tableParams, setTableParams ] = useState({
          pagination: {
            current: 1,
            pageSize: 10,
            total: prefetchedData?.total
          },
          ...defaultTableParams
        }),

        fetchData = debounce( async ( params ) => {

          try {
            setLoading( true );
            const data = await api.getList( flatten( structuredClone( params ) ) );
            setData( data?.rows );
            if ( isTableData( data ) ) {
              setTableParams({
                ...params,
                pagination: {
                  ...params.pagination,
                  total: data.total
                }
              });

            }
          } catch ( e ) {
            console.error( e );
            setError( e );
          } finally {
            setLoading( false );
          }
        }, 300 );

  return {
    loading,
    error,
    data,
    setData,
    tableParams,
    setTableParams,
    fetchData,
    setLoading,
    setError
  };
}