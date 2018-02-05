const Router = require( "./Router" ),
      Controller = require( "./Controller" ),
      // Node.js packages
      http = require( "http" ),
      url = require( "url" ),
      // External packages
      express = require( "express" ),
      bodyParser = require( "body-parser" ),
      dbg = require( "debug" ),

      app = express(),

      router = new Router( app, new Controller() ),

      server = http.createServer( app );

// Applying middleware
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.disable( "x-powered-by" ); // removing X-Powered-By


// Reporting to the console what is going on
app.use(function ( req, res, next ) {
  const data = url.parse( req.url );
  dbg( "HTTP" )( `${req.method} ${data.pathname}` );
  next();
});

router.dispatch([
  [ "get", "/news/:id", "getNewsAction" ],
  [ "post", "/news", "postNewsAction" ]
]);

// Handling exception thrown during execution
app.use(function ( err, req, res, next ) {
  dbg( "ERROR" )( `${err.message}` );
  res.status( 500 ).send({ message: err.message });
});

module.exports = server;