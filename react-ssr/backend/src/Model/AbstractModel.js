import mysql from "mysql";
import { promisify } from "util";

const isEmpty = obj => Object.keys( obj ).length === 0,

      DEFAULT_SEARCH_PARAMS = {
        pageSize: 50,
        current: 1,
        sortField: "",
        sortOrder: "DESC",
        filter: {}
      };



export default class AbstractModel {

  constructor( connector ) {
    this.query = connector.query;
  }

  async remove( id ){
    await this.query( `DELETE FROM \`${ this.table }\` WHERE id = ? LIMIT 1`, [ parseInt( id, 10 ) ] );
  }

  async find( id ){
    const res = await this.query( `SELECT * FROM \`${ this.table }\` WHERE id = ? LIMIT 1`, [ parseInt( id, 10 ) ] );
    return res ? res.shift() : null;
  }

  async findAll( rawParams ){
    const params = { ...DEFAULT_SEARCH_PARAMS, ...rawParams },
          orderLimit = AbstractModel.buildOrderLimitQuery( params ),
          [ fetch ] = isEmpty( params.filter )
            ? await this.query( `SELECT COUNT(*) as total FROM \`${ this.table }\`` )
            : await this.query( `SELECT COUNT(*) as total FROM \`${ this.table }\` WHERE ?`, params.filter ),

          rows = isEmpty( params.filter )
            ? await this.query( `SELECT * FROM \`${ this.table }\` ${ orderLimit }` )
            : await this.query( `SELECT * FROM \`${ this.table }\` WHERE ? ${ orderLimit }`, params.filter );

    return {
      total: fetch.total,
      rows
    };
  }

  static buildOrderLimitQuery( params ) {
    const chunks = [];
    if ( params.sortField ) {
      chunks.push( ` ORDER by ${ params.sortField } ${ params.sortOrder === "DESC" ? "DESC" : "ASC" }` );
    }
    chunks.push( ` LIMIT ${ ( params.current - 1 ) * params.pageSize }, ${ params.pageSize }` );
    return chunks.join( " " );
  }

}
