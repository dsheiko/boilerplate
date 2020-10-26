import React from "react";
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter } from "react-router";
import http from "http";
import mainPage from "./Template";
import express from "express";
import dbg from "debug";
import bodyParser from "body-parser";

import App from "Containers/App";
import * as actions from "Actions/app";
import SettingsProjectTable from "Components/Main/Settings/Project/SettingsProjectTable";
import { api as projectApi } from "Api/Project";
import { DEFAULT_STATE } from "Reducers";

import configureStore, { history } from "./configureStore";
import config from "./Config";
import Connector from "./Model/Connector";
import ProjectModel from "./Model/Project";


const app = express(),
      API_VER = "/api/v1",
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

app.delete( API_VER + "/projects/:id", async ( req, res, next ) => {
  try {
    return res.send( await projectModel.remove( req.params.id ) );
  } catch ( err ) {
    next( err );
  }
});

app.put( API_VER + "/projects/:id", async ( req, res, next ) => {
  try {
    return res.send( await projectModel.update( req.params.id, req.body ) );
  } catch ( err ) {
    next( err );
  }
});

app.post( API_VER + "/projects", async ( req, res, next ) => {
  try {
    return res.send( await projectModel.add( req.body ) );
  } catch ( err ) {
    next( err );
  }
});


app.get( API_VER + "/projects/:id", async ( req, res, next ) => {
  try {
    return res.send( await projectModel.find( req.params.id ) );
  } catch ( err ) {
    next( err );
  }
});

app.get( API_VER + "/projects", async ( req, res, next ) => {
  try {
    return res.send( await projectModel.findAll( req.query ) );
  } catch ( err ) {
    next( err );
  }
});

app.get(/.*/, async ( req, res ) => {
  const store = configureStore( DEFAULT_STATE, req.url );

  await store.dispatch( actions.loadTable( SettingsProjectTable.displayName, projectApi ) );

  const jsx = ( <ReduxProvider store={ store }>
            <StaticRouter context={ DEFAULT_STATE } location={ req.url }>
                <App />
            </StaticRouter>
        </ReduxProvider> ),
        html = mainPage({
          content: renderToString( jsx ),
          host: process.env.DEMO_NODE_SERVER_HOST,
          port: process.env.DEMO_NODE_SERVER_PORT,
          state: store.getState()
        });


  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( html );
});


// Handling 404 errors
app.use( ( req, res ) => {
  const { method, url } = req,
        message = `Cannot find ${method} ${url}`;
  dbg( "ERROR" )( message );
  return res.status( 404 ).send({ message });
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
