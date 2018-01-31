const NewsModel = require( "./NewsModel" );

class Controller {

  constructor() {
    this.newsModel = new NewsModel();
  }
  /**
   * Add a news entry
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {function} [next]
   */
  async postNewsAction( req, res ) {
    const { title, text } = req.body;
    if ( !title || !text ) {
      throw new TypeError( "Required parameters title and text are missing or empty" );
    }
    const id = await this.newsModel.save( title, text );
    res.send({ message: `News entry with id ${id} added` });
  }
  /**
   * Get news entry content
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {function} [next]
   */
  async getNewsAction( req, res ) {
    const { id } = req.params;
    if ( !Number( id ) ) {
      throw new TypeError( "Required parameter is is missing or empty" );
    }
    res.send({ content: await this.newsModel.get( id ) });
  }
}

module.exports = Controller;