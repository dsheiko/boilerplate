class Router {
  /**
   *
   * @param {App} app
   * @param {Controller} controller
   */
  constructor( app, controller ) {
    this.app = app;
    this.controller = controller;
  }
  /**
   * Wrapping Async Await Routes
   * @see https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
   * @param {string} action
   * @returns {function}
   */
  asyncMiddleware( action ) {
    const ctrl = this.controller,
          // Add here check for action not found exceptions
          fn = ctrl[ action ].bind( ctrl );
    return ( req, res, next ) => {
      Promise.resolve( fn( req, res, next ) ).catch( next );
    };
  }
  /**
   * Register routes according to supplied map
   * @param {Array.<Array.<string>>} map
   */
  dispatch( map ) {
    map.forEach( ([ method, route, action ]) => {
      const ctrl = this.controller;
      // Add here checks for method not found exceptions
      this.app[ method ]( route, this.asyncMiddleware( action ) );
    });
  }
}

module.exports = Router;