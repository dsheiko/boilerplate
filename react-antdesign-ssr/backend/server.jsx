import React from "react";
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter } from "react-router";
import http from "http";
import fs from "fs";
import { join } from "path";
import express from "express";
import dbg from "debug";
import bodyParser from "body-parser";
import App from "Containers/App";
import * as actions from "Actions/app";
import SettingsProjectTable from "Components/Main/Settings/Project/SettingsProjectTable";
import { DEFAULT_STATE } from "Reducers";

import configureStore from "./configureStore";
import config from "./Config";
import router from "./Router/index";
import Connector from "./Model/Connector";
import ProjectModel from "./Model/Project";
import pkg from "../package.json";

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

async function getProjects() {
  const data = await projectModel.findAll({ 
            pageSize: 50,
            current: 1,
            sortField: "name",
            sortOrder: "DESC"
          }),
          rawRows = data.rows,
          total = data.total,
          rows = rawRows.map( item => ({
            ...item,
            key: item.id
          }) );
  return { rows, total, preloaded: true };
}


app.get(/.*/, async ( req, res ) => {
  const store = configureStore( DEFAULT_STATE, req.url );

  await store.dispatch( actions.setTable( SettingsProjectTable.displayName, await getProjects() ) );

  const jsx = ( <ReduxProvider store={ store }>
          <StaticRouter context={ DEFAULT_STATE } location={ req.url }>
              <App />
          </StaticRouter>
      </ReduxProvider> ),
      tpl = fs.readFileSync( join( __dirname, "..", "Template", "index.tpl" ), "utf8" ),
      html = tpl
          .replace( `{{ROOT}}`, renderToString( jsx ) )
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          .replace( `{{__PRELOADED_STATE__}}`, JSON.stringify( store.getState() ).replace(
            /</g,
            "\\u003c"
          ) )
          .replace(`{{DEMO_NODE_SERVER_HOST}}`, process.env.DEMO_NODE_SERVER_HOST)
          .replace(`{{DEMO_NODE_SERVER_PORT}}`, process.env.DEMO_NODE_SERVER_PORT)
          .replace( `{{JS}}`, `console.info( "Rev: ${ pkg.version }" )` );


  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( html );
});


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
