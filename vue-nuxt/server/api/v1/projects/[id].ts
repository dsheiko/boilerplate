import { projectModel } from "../../../utils/model/index";

export default defineEventHandler( async ( event ) => {
  const method = getMethod( event );
  const id = parseInt( getRouterParam( event, "id" ) ?? "0", 10 );

  if ( method === "GET" ) {
    return projectModel.find( id );
  }

  if ( method === "PUT" ) {
    const body = await readBody( event );
    await projectModel.update( id, body );
    return {};
  }

  if ( method === "DELETE" ) {
    await projectModel.remove( id );
    return {};
  }
} );
