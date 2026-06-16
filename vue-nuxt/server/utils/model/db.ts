import mysql from "mysql2/promise";
import type { ConnectionOptions, Connection, RowDataPacket } from "mysql2/promise";

let conn: Connection | null = null;

export async function connect( config: ConnectionOptions ) {
  if ( conn !== null ) {
    return;
  }
  conn = await mysql.createConnection( config );
}

export async function query( sql: string, params: ( string | number )[] = [] ): Promise<RowDataPacket[]> {
  if ( conn === null ) {
    throw new Error( "Connection is not established. Use connect method" );
  }
  const [ results ] = await conn.execute<RowDataPacket[]>( sql, params );
  return results;
}
