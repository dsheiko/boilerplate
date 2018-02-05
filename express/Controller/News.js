const AbstractController = require( "./AbstractController" ),
      InvalidArgumentException = require( "../Exception/InvalidArgument" );

/**
 * @apiDefine NewsGroup News management endpoints
 */

class News extends AbstractController {
  /**
   *
   * @param {AbstractModel} model
   */
  constructor( model ) {
    super();
    this.model = model;
  }

  /**
   *
   * @api {post} /news Add a news entry
   * @apiVersion 0.3.0
   * @apiName PostEntry
   * @apiGroup NewsGroup
   *
   * @apiParam {string} title
   * @apiParam {string} body
   *
   * @apiExample Example usage:
   * curl -X POST http://127.0.0.1:9002/news \
   *   -H 'content-type: multipart/form-data' \
   *   -F 'title=some title' \
   *   -F 'body=some body'
   *
   * @apiError InvalidArgument  Required parameters missing
   * @apiError NotFound   The news entry was not found.
   *
   * @apiErrorExample Response (example):
   *     HTTP/1.1 400 Not Found
   *     {
   *       "message": "Required parameters title and text are missing or empty"
   *     }
   *
   **/

  /**
   * Add a news entry
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {function} [next]
   */
  async postEntryAction( req, res ) {
    const { title, text } = req.body;
    if ( !title || !text ) {
      throw new InvalidArgumentException( "Required parameters title and text are missing or empty" );
    }
    const id = await this.model.save( title, text );
    res.send({ message: `News entry with id ${id} added` });
  }
  /**
   *
   * @api {get} /news/:id Get news entry content
   * @apiVersion 0.3.0
   * @apiName GetEntry
   * @apiGroup NewsGroup
   *
   *
   * @apiParam {Number} id News entry id
   *
   * @apiExample Example usage:
   * curl -X GET http://127.0.0.1:9002/news/101
   *
   * @apiError InvalidArgument  Required parameters missing
   * @apiError NotFound   The news entry was not found.
   *
   * @apiErrorExample Response (example):
   *     HTTP/1.1 400 Not Found
   *     {
   *       "message": "Required parameter is is missing or empty"
   *     }
   *
   */

  /**
   * Get news entry content
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   * @param {function} [next]
   */
  async getEntryAction( req, res ) {
    const { id } = req.params;
    if ( !Number( id ) ) {
      throw new InvalidArgumentException( "Required parameter is is missing or empty" );
    }
    res.send({ content: await this.model.get( id ) });
  }
}

module.exports = News;