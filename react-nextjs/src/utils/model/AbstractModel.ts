import { RowDataPacket } from "mysql2/promise";
import { query } from "@/utils/model/connector";

export type SearchParams = {
        pageSize: number,
        current: number,
        sortField: string,
        sortOrder: string,
        filter?: string
      };

export type TableData = {
  total: number,
  rows: any[]
};

const isEmpty = ( obj: object ): boolean => Object.keys( obj ).length === 0,

      DEFAULT_SEARCH_PARAMS: SearchParams = {
        pageSize: 10,
        current: 1,
        sortField: "id",
        sortOrder: "DESC"
      };



export default class AbstractModel {

  query: typeof query;

  table: string | null = null;

  constructor( connector: { query: typeof query } ) {
    this.query = connector.query;
  }

  async remove( id: number ) {
    await this.query( `DELETE FROM \`${ this.table }\` WHERE id = ? LIMIT 1`, [ id ] );
  }

  async find( id: number ){
    const res: RowDataPacket[] = await this.query( `SELECT * FROM \`${ this.table }\` WHERE id = ? LIMIT 1`, [ id ] );
    return Array.isArray( res ) ? res.shift() : null;
  }

  async findAll( rawParams: SearchParams = DEFAULT_SEARCH_PARAMS ): Promise<TableData> {
    const params = { ...DEFAULT_SEARCH_PARAMS, ...rawParams },
          orderLimit = AbstractModel.buildOrderLimitQuery( params ),
          filters = rawParams.filter ? JSON.parse( rawParams.filter ) : {};

    const info: RowDataPacket[] = typeof( filters ) !== "object" || isEmpty( filters )
            ? await this.query( `SELECT COUNT(*) as total FROM \`${ this.table }\`` )
            : await this.query( `SELECT COUNT(*) as total FROM \`${ this.table }\` WHERE ${ AbstractModel.filtersToSql( filters ) }` ),

          rows: RowDataPacket[] = typeof( filters ) !== "object" || isEmpty( filters )
            ? await this.query( `SELECT * FROM \`${ this.table }\` ${ orderLimit }` )
            : await this.query( `SELECT * FROM \`${ this.table }\` WHERE ${ AbstractModel.filtersToSql( filters ) } ${ orderLimit }` );
    
    return {
      total: 0 in info ? info[ 0 ].total : 0,
      rows: rows.map( row => ({ ...row, key:  row.id }))
    };
  }

  static buildOrderLimitQuery( params: SearchParams ) {
    const chunks = [];
    if ( params.sortField ) {
      chunks.push( ` ORDER by \`${ params.sortField }\` ${ params.sortOrder === "DESC" ? "DESC" : "ASC" }` );
    }
    chunks.push( ` LIMIT ${ ( params.current - 1 ) * params.pageSize }, ${ params.pageSize }` );
    return chunks.join( " " );
  }

  static filtersToSql( filters: Record<string, string> ) {  
    return Object.keys( filters ).reduce(( carry: string[], key: string ) => {
      carry.push( `${  key } = "${ filters[ key ] }"` );
      return carry;
    }, [] ).join( " AND " );
  }

}
