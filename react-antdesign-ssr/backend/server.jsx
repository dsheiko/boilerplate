import http from "http";
import { join } from "path";
import express from "express";
import dbg from "debug";
import bodyParser from "body-parser";
import config from "./Config";
import router from "./Router/index";
import Connector from "./Model/Connector";
import ProjectModel from "./Model/Project";

const app = express(),      
      connector = new Connector( config.mysql ),
      projectModel = new ProjectModel( connector ),


      server = http.createServer( app );

app.disable( "x-powered-by" );

app.use( express.static( join( __dirname, "..", "..", "public" ) ) );

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

app.use( router({ projectModel }) );


// Handling 404 errors
app.use(( req, res, next ) => {
  const { method, url } = req,
        message = `Cannot find ${method} ${url}`;
  dbg( "ERROR" )( message );
  res.status( 404 ).send({ message });
});


// Handling exception thrown during execution
function errorHandler ( err, req, res, next ) {
  if ( res.headersSent ) {
    return next( err );
  }
  dbg( "ERROR" )( `Error handler: ${err.message}` );
  return res
    .status( 500 )
    .send({ message: err.message });
}

app.use( errorHandler );

// Starting the server
server.listen( process.env.DEMO_NODE_SERVER_PORT, process.env.DEMO_NODE_SERVER_HOST, () => {
  const { address, port } = server.address();
  dbg( "INFO" )( `Node.js server listening on ${ address }:${ port }` );
});
