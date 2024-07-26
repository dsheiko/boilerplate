import { useState } from "react";
import { getAxiosClient } from "~/Util";
import { debounce } from "throttle-debounce";

const client = getAxiosClient();

function isTableData( data ) {
    return "total" in data && "rows" in data;
}

export default function useService( url, preFetch ) {
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState();
  const [ data, setData ] = useState( preFetch?.rows );
  const [ tableParams, setTableParams ] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: preFetch?.total
    },
  });

  const fetchData = debounce( 300, async ( params ) => {
    try {
      setLoading( true );
      const res = await client.get( url, { params } );
      
      setData( res.data?.rows );
      if ( isTableData( res.data ) ) {
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: res.data.total
            }
        });
      }
    } catch ( e ) {
      setError( e );
    } finally {
      setLoading( false );
    }
  });

  return {
    loading,
    error,
    data,
    tableParams,
    setTableParams,
    fetchData,
  };
}