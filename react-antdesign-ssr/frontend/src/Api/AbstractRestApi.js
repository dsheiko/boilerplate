import axios from "axios";

function getConfig() {
  if ( typeof window !== "undefined" && "config" in window ) {
   return window.config;
  }
  return {
    DEMO_NODE_SERVER_HOST: process.env.DEMO_NODE_SERVER_HOST,
    DEMO_NODE_SERVER_PORT: process.env.DEMO_NODE_SERVER_PORT
  };
}

export default class AbstractRestApi {

  constructor() {
    const { DEMO_NODE_SERVER_HOST, DEMO_NODE_SERVER_PORT } = getConfig();
    this.client = axios.create({
      baseURL: `//${ DEMO_NODE_SERVER_HOST }:${ DEMO_NODE_SERVER_PORT }/api/v1/`
    });
  }

  transformList( res ) {
    return res;
  }

  async getList( params = {} ) {
    const res = await this.client.get( this.collection, { params } );
    return this.transformList( res.data );
  }
  async get( id ) {
    return await this.client.get( `${ this.collection }/${ id }` );
  }
  async remove( id ) {
    return await this.client.delete( `${ this.collection }/${ id }` );
  }
  async add( data ) {
    return await this.client.post( this.collection, data );
  }
  async update( id, data ) {
    return await this.client.put( `${ this.collection }/${ id }`, data );
  }

}