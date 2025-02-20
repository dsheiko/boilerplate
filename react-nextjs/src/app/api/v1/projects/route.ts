import { type NextRequest } from "next/server";
import { projectModel } from "@/utils/model";
import { removeNullProps } from "@/utils/utils";
import { AnyObject } from "@/utils/type";

function assignStrictTypes( o: AnyObject ) { 
  return Object.keys( o ).reduce( ( carry: AnyObject, key: string ) => {    
    carry[ key ] = [ "current", "pageSize" ].includes( key ) ? parseInt( o[ key ], 10 ) : String( o[ key ] );
    return carry;
  }, {});
}

export async function GET( request: NextRequest ) {
  const searchParams = request.nextUrl.searchParams,
        params = assignStrictTypes( removeNullProps({
          pageSize: searchParams.get( "pageSize" ),
          current: searchParams.get( "current" ),
          sortField: searchParams.get( "sortField" ),
          sortOrder: searchParams.get( "sortOrder" )
        }));

  const dataSource = await projectModel.findAll( params );
        
  return Response.json( dataSource );
}