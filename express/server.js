const Router = require( "./Lib/Router" ),
      Controller = require( "./Lib/Controller" ),
      // Node.js packages
      http = require( "http" ),
      url = require( "url" ),
      // External packages
      express = require( "express" ),
      bodyParser = require( "body-parser" ),
      dbg = require( "debug" ),
      // argv.p - port
      // argv.h - host
      // from command line or from defaults
      argv = { ...{
        p: 9002,
        h: "127.0.0.1"
      } , ...require( "minimist" )( process.argv.slice( 2 ) ) },


      app = express(),

      router = new Router( app, new Controller() ),

      server = http.createServer( app );

// Applying middleware
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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
  res.status( 500 ).send({ ok: 0, message: err.message });
});

// Starting the server
server.listen( argv.p, argv.h, () => {
  const { address, port } = server.address();
  console.log("Listening on %s:%d", address, port);
});
