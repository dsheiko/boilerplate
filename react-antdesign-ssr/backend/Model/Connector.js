import mysql from "mysql";
import { promisify } from "util";

export default class Connector {

  constructor( config ) {
    this.client = mysql.createConnection( config );
    this.client.connect();
    this.query = promisify( this.client.query ).bind( this.client );
  }

  async close(){
    this.client.end();
  }

}