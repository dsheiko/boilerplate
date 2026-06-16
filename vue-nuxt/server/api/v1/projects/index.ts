import { projectModel } from "../../../utils/model/index";
import { removeNullProps } from "../../../utils/utils";
import type { AnyObject } from "~/utils/type";

function assignStrictTypes( o: AnyObject ): AnyObject {
  return Object.keys( o ).reduce( ( carry: AnyObject, key: string ) => {
    carry[ key ] = [ "current", "pageSize" ].includes( key ) ? parseInt( o[ key ], 10 ) : String( o[ key ] );
    return carry;
  }, {} );
}

export default defineEventHandler( async ( event ) => {
  const method = getMethod( event );

  if ( method === "GET" ) {
    const qs = getQuery( event );
    const params = assignStrictTypes( removeNullProps( {
      pageSize: qs.pageSize ?? null,
      current: qs.current ?? null,
      sortField: qs.sortField ?? null,
      sortOrder: qs.sortOrder ?? null,
    } ) );
    return projectModel.findAll( params );
  }

  if ( method === "POST" ) {
    const body = await readBody( event );
    await projectModel.add( body );
    return {};
  }
} );
