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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE( req: Request, { params }: any ) {  
  const { id } = await params;
  await projectModel.remove( parseInt( id, 10 ) );
  return Response.json( {} );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT( req: NextRequest, { params }: any ) {
  const json = await req.json();
  const { id } = await params;
  await projectModel.update( parseInt( id, 10 ), json );       
  return Response.json( {} );
}

export async function POST( req: Request ) {
  const json = await req.json();
  await projectModel.add( json );      
  return Response.json( {} );
}