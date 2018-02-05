class Router {
  /**
   *
   * @param {App} app
   */
  constructor( app ) {
    this.app = app;
  }

  /**
   * Wrapping Async Await Routes
   * @see https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
   * @param {string} controller
   * @param {string} action
   * @returns {function}
   */
  asyncMiddleware( controller, action ) {
    if ( !( action in controller ) ) {
        throw new RangeError( `Invalid controller action ${action}` );
    }
    const fn = controller[ action ].bind( controller );
    return ( req, res, next ) => {
      Promise.resolve( fn( req, res, next ) ).catch( next );
    };
  }
  /**
   * Register routes according to supplied map
   * @param {Array.<Array.<string>>} map
   */
  dispatch( map ) {
    map.forEach( ([ method, route, controller, action ]) => {
      if ( !( method in this.app ) ) {
        throw new RangeError( `Invalid HTTP method ${method}` );
      }
      this.app[ method ]( route, this.asyncMiddleware( controller, action ) );
    });
  }
}

module.exports = Router;