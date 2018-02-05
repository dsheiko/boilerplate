const rp = require( "request-promise" ),
      server = require( "../server" ),
      HOST = "127.0.0.1",
      PORT = 9002;

/**
 * Perform HTTP request
 * @param {string} method
 * @param {string} uri
 * @param {object} [body]
 * @returns {Promise}
 */
function req( method, uri, body = {} ) {
  return rp({
    method,
    uri: `http://${HOST}:${PORT}/${uri}`,
    json: true,
    body
  });
}

describe("API", () => {

  beforeAll( done  => {
    server.listen( PORT, HOST, done );
  });

  afterAll( done  => {
    server.close( done );
  });

  describe("GET /not-registered-route", () => {
    it( "fails with 404 status code", async () => {
      await req( "GET" , "not-registered-route" )
        .catch( r => expect( r.statusCode ).toBe( 404 ) );
    });
  });

  describe("GET /news/:id", () => {
    it( "responds with intended content", async () => {
      await req( "GET" , "news/101" )
        .then( r => expect( r.content ).toBe( "Content of new entry 101" ) );
    });
    it( "fails with 400 status code when invalid :id ", async () => {
      await req( "GET" , "news/invalid" )
        .catch( r => {
          expect( r.statusCode ).toBe( 400 );
          expect( r.error.message ).toBe( "Required parameter is is missing or empty" );
        });
    });
  });

  describe("POST /news", () => {
    it( "responds with intended content", async () => {
      await req( "POST" , "news", { title: "foo", text: "bar" } )
        .then( r => expect( r.message ).toContain( "News entry with id" ) );
    });
    it( "fails with 400 status code when invalid data ", async () => {
      await req( "POST" , "news" )
        .catch( r => {
          expect( r.statusCode ).toBe( 400 );
          expect( r.error.message ).toBe( "Required parameters title and text are missing or empty" );
        });
    });
  });

});