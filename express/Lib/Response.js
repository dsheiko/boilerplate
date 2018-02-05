const InvalidArgumentException = require( "../Exception/InvalidArgument" );

class Response {
  /**
   * Figure out a suiting server status for a supplied error
   *
   * @param {Error} err
   * @returns {Number}
   */
  static getServerStatus( err ) {
    switch ( true  ) {
      case err instanceof InvalidArgumentException:
        return 400;
      default:
        return 500;
    }
  }
}

module.exports = Response;