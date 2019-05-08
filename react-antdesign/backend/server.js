const http = require( "http" ),
      fs = require( "fs" ),
      { join } = require( "path" ),
      url = require( "url" ),

      express = require( "express" ),

      dbg = require( "debug" ),

      bodyParser = require( "body-parser" ),

      app = express(),

      API_VER = "/api/v1",

      config = require( "./Config" ),
      Connector = require( "./Model/Connector" ),
      ProjectModel = require( "./Model/Project" ),

      connector = new Connector( config.mysql ),
      projectModel = new ProjectModel( connector ),


      server = http.createServer( app );


app.disable( "x-powered-by" );

app.use( express.static( "public" ) );

// Applying middleware
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Reporting to the console what is going on
app.use(( req, res, next ) => {
  const { method, url } = req;
  dbg( "HTTP" )( `${method} ${url}` );
  next();
});

app.delete( API_VER + "/projects/:id", async ( req, res ) => {
  return res.send( await projectModel.remove( req.params.id ) );
});

app.put( API_VER + "/projects/:id", async ( req, res ) => {
  return res.send( await projectModel.update( req.params.id, req.body ) );
});

app.post( API_VER + "/projects", async ( req, res ) => {
  return res.send( await projectModel.add( req.body ) );
});


app.get( API_VER + "/projects/:id", async ( req, res ) => {
  return res.send( await projectModel.find( req.params.id ) );
});

app.get( API_VER + "/projects", async ( req, res ) => {
  return res.send( await projectModel.findAll( req.query ) );
});


app.get(/.*/, ( req, res ) => {
  const tpl = fs.readFileSync( join( __dirname, "Template", "index.tpl" ), "utf8" ),
        html = tpl
          .replace(`{{DEMO_NODE_SERVER_HOST}}`, process.env.DEMO_NODE_SERVER_HOST)
          .replace(`{{DEMO_NODE_SERVER_PORT}}`, process.env.DEMO_NODE_SERVER_PORT);

  return res.send( html );
});


// Handling exception thrown during execution
app.use(( err, req, res, next ) => {
  dbg( "ERROR" )( `${err.message}` );
  res
    .status( 500 )
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