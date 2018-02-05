const Router = require( "./Lib/Router" ),
      Response = require( "./Lib/Response" ),
      // MVC components
      NewsController = require( "./Controller/News" ),
      NewsModel = require( "./Model/News" ),

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
      cors = require( "cors" ),

      app = express(),

      router = new Router( app ),
      // Sample Controller
      newsCtrl = new NewsController( new NewsModel() ),

      server = http.createServer( app );

// Applying middleware
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.disable( "x-powered-by" ); // removing X-Powered-By

// Enable all CORS requests
// More options https://github.com/expressjs/cors
app.use( cors() );

// Reporting to the console what is going on
app.use(( req, res, next ) => {
  const { method, url } = req;
  dbg( "HTTP" )( `${method} ${url}` );
  next();
});

router.dispatch([
  [ "get", "/news/:id", newsCtrl, "getEntryAction" ],
  [ "post", "/news", newsCtrl, "postEntryAction" ]
]);


// Handling exception thrown during execution
app.use(( err, req, res, next ) => {
  dbg( "ERROR" )( `${err.message}` );
  res
    .status( Response.getServerStatus( err ) )
    .send({ message: err.message });
});

// Handling 404 errors
app.use(( req, res, next ) => {
  const { method, url } = req,
        message = `Cannot find ${method} ${url}`;
  dbg( "ERROR" )( message );
  res.status( 404 ).send({ message });
});

module.exports = server;