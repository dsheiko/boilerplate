const mysql = require( "mysql" ),
      { promisify } = require( "util" );

class Connector {

  constructor( config ) {
    this.client = mysql.createConnection( config );
    this.client.connect();
    this.query = promisify( this.client.query ).bind( this.client );
  }

  async close(){
    this.client.end();
  }

}

module.exports = Connector;