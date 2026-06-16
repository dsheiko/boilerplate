import type { AnyObject } from "./type";

const BASE = "/api/v1/";

async function request( url: string, options?: RequestInit ) {
  const res = await fetch( url, options );
  if ( !res.ok ) {
    throw new Error( `${ res.status } ${ res.statusText }` );
  }
  return res.json();
}

export async function getList( collection: string ) {
  return request( `${ BASE }${ collection }` );
}

export async function get( collection: string, id: number ) {
  if ( !id ) {
    return {};
  }
  return request( `${ BASE }${ collection }/${ id }` );
}

export async function remove( collection: string, id: number ) {
  return request( `${ BASE }${ collection }/${ id }`, { method: "DELETE" } );
}

export async function add( collection: string, data: AnyObject ) {
  return request( `${ BASE }${ collection }`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( data ),
  } );
}

export async function update( collection: string, id: number, data: AnyObject ) {
  return request( `${ BASE }${ collection }/${ id }`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( data ),
  } );
}
