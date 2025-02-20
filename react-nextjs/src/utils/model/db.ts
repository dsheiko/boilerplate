import mysql, { ConnectionOptions, QueryResult, Connection, RowDataPacket } from "mysql2/promise";

let conn: Connection | null = null;

export async function connect( config: ConnectionOptions ){
  conn = await mysql.createConnection( config );
}

export async function query( query: string, params: ( string | number )[] = [] ): Promise<RowDataPacket[]> {
  if ( conn === null ) {
    throw new Error( "Connection is not established. Use connect method" );
  }
  const [ results ] = await conn.execute<RowDataPacket[]>( query, params );
  return results;
}