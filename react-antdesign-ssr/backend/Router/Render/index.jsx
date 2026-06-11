import React from "react";

// @rc-component packages use React.useLayoutEffect directly.
// Alias it to useEffect so SSR renderToString does not emit warnings.
React.useLayoutEffect = React.useEffect;
import fs from "node:fs";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { 
    createStaticHandler,
    createStaticRouter, 
    StaticRouterProvider } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server"
import { makeReactRoutes } from "~/Containers/App";
import createFetchRequest from "./request-adapter";
import { HelmetProvider, Helmet } from "react-helmet-async";
// import { DEFAULT_STATE } from "~/Reducers";
// import configureStore from "../../configureStore";
import { getProjects } from "./selectors";
import pkg from "../../../package.json";
import { extractStyle } from "@ant-design/static-style-extract";

import { Provider as ReduxProvider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit";
import appReducer, { login } from "~/Store/app";


const PUBLIC_PATCH = path.resolve( __dirname + "/../../public/build" ),
      ANTD_CSS_FILE = path.join( PUBLIC_PATCH, "antd.min.css" ),
      extractor = new ChunkExtractor({ statsFile: path.join( PUBLIC_PATCH, "loadable-stats.json" ) }),
      store = configureStore({
        reducer: { app: appReducer }
      });

// generate Ant Design static CSS file if none found.
// @ant-design/static-style-extract renders every antd component to collect styles,
// including ones deprecated in v6 (Input.Group, List). Suppress those warnings
// for this call only — they are internal to the package and not actionable.
try {
    if ( !fs.existsSync( ANTD_CSS_FILE ) ) {
        const _error = console.error.bind( console );
        console.error = ( ...args ) => {
            if ( typeof args[ 0 ] === "string" && /\[antd:|useLayoutEffect/.test( args[ 0 ] ) ) return;
            _error( ...args );
        };
        try {
            fs.writeFileSync( ANTD_CSS_FILE, extractStyle() );
        } finally {
            console.error = _error;
        }
    }
} catch {}

export default function renderRoutes( router, { projectModel } ) {

    const handler = createStaticHandler( makeReactRoutes({ getProjects: async () => await getProjects( projectModel ) }) );
	
    router.get(/.*/, async ( req, res ) => {
        const helmetContext = { helmet: {} };

        let fetchRequest = createFetchRequest( req, res );
        let context = await handler.query( fetchRequest );
        let router = createStaticRouter(
            handler.dataRoutes,
            context
        );

        // Example of setting store state on server-side
        store.dispatch( login( "Jon Doe" ) )

        const jsx = extractor.collectChunks(<ReduxProvider store={ store }>
                   <HelmetProvider context={ helmetContext }>
                    <StaticRouterProvider
                        router={router}
                        context={context}
                        nonce="the-nonce"
                    />
                    </HelmetProvider>
                </ReduxProvider>
             ),            
            bodyHtml =  renderToString( jsx ),
            { helmet } = helmetContext,
            html =  `
<!doctype html>
<html ${ helmet.htmlAttributes.toString() }>
  <head>
    
    ${ helmet.title.toString() }
    ${ helmet.meta.toString() }
    ${ helmet.link.toString() }
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href="/build/antd.min.css" rel="stylesheet" type="text/css"/>

    <style>
    body {
        margin: 0;
    }
    .ant-layout-header > .logo {
        display: flex;
        align-items: center;
        height: 100%;
    }
    .ant-layout-header > .logo svg {
      width: 32px;
      height: 32px;
    }
    </style>

    <script>
      window.config = {
        DEMO_NODE_SERVER_HOST: "${ process.env.DEMO_NODE_SERVER_HOST }",
        DEMO_NODE_SERVER_PORT: "${ process.env.DEMO_NODE_SERVER_PORT }"
      };
      window.__PRELOADED_STATE__ = ${  JSON.stringify( store.getState() ).replace(/</g, "\\u003c" ) };
      console.info( "Rev: ${ pkg.version }" )
    </script>

    ${ extractor.getLinkTags() }
    ${ extractor.getStyleTags() }
    ${ extractor.getScriptTags() }
    
  </head>
  <body ${ helmet.bodyAttributes.toString() }>
    <div id="root">${ bodyHtml }</div>   
    
  </body>
</html>
`;

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( html );
    });
}