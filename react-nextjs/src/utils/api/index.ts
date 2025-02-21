import axios from "axios";
import { AnyObject } from "@/utils/type";

const client = axios.create({
  baseURL: `/api/v1/`
});

export async function getList( collection: string, params: AnyObject = {} ) {
  const res = await client.get( collection, { params } );
  return res.data;
}

export async function get( collection: string , id: number ) {
  if ( !id ) {
    return {};
  }
  return ( await client.get( `${ collection }/${ id }` ) ).data;
}
export async function remove( collection: string, id: number ) {
  return await client.delete( `${ collection }/${ id }` );
}
export async function add( collection: string, data: AnyObject ) {
  return await client.post( collection, data );
}
export async function update( collection: string, id: number, data: AnyObject ) {
  return await client.put( `${ collection }/${ id }`, data );
}