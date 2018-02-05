const Router = require( "./Router" ),
      Controller = require( "./Controller" ),
      // Node.js packages
      http = require( "http" ),
      // Do not forget to paas in credentials if using HTTPS
      // credentials = { key: privateKey, cert: certificate };
      // https = require( "https" );
      // https.createServer( credentials, app );
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
  const { method, url } = req;
  dbg( "HTTP" )( `${method} ${url}` );
  next();
});

router.dispatch([
  [ "get", "/news/:id", "getNewsAction" ],
  [ "post", "/news", "postNewsAction" ]
]);

// Handling exception thrown during execution
app.use(( err, req, res, next ) => {
  dbg( "ERROR" )( `${err.message}` );
  res.status( 500 ).send({ message: err.message });
});

// Handling 404 errors
app.use(( req, res, next ) => {
  const { method, url } = req,
        message = `Cannot find ${method} ${url}`;
  dbg( "ERROR" )( message );
  res.status( 404 ).send({ ok: 0, payload: { message } });
});

module.exports = server;