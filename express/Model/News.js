const AbstractModel = require( "./AbstractModel" );

class News extends AbstractModel {
  /**
   * Stub method
   * @param {string} title
   * @param {string} text
   * @returns {Promise}
   */
  async save( title, text ) {
    return await Promise.resolve( Math.floor( Math.random() * 100 ) );
  }
  /**
   * Stub method
   * @param {number} id
   * @returns {Promise}
   */
  async get( id ) {
    return await Promise.resolve( `Content of new entry ${id}` );
  }
}

module.exports = News;