import React from "react";
import fs from "node:fs";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { 
    createStaticHandler,
    createStaticRouter, 
    StaticRouterProvider } from "react-router-dom/server";
import { makeReactRoutes } from "~/Containers/App";
import createFetchRequest from "./request-adapter";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { DEFAULT_STATE } from "~/Reducers";
import configureStore from "../../configureStore";
import { getProjects } from "./selectors";
import pkg from "../../../package.json";
import { extractStyle } from '@ant-design/static-style-extract';


const ANTD_CSS_FILE = path.join( __dirname, "..", "..", "public", "build", "antd.min.css" );

// generate Ant Design static CSS file if none found
try {
    fs.existsSync( ANTD_CSS_FILE ) || fs.writeFileSync( ANTD_CSS_FILE, extractStyle() );
} catch {}

export default function renderRoutes( router, { projectModel } ) {

    const handler = createStaticHandler( makeReactRoutes({ getProjects: async () => await getProjects( projectModel ) }) );
	
    router.get(/.*/, async ( req, res ) => {
        const store = configureStore( DEFAULT_STATE, req.url ),
              helmetContext = { helmet: {} };

        let fetchRequest = createFetchRequest( req, res );
        let context = await handler.query( fetchRequest );
        let router = createStaticRouter(
            handler.dataRoutes,
            context
        );

        const jsx = (<ReduxProvider store={ store }>
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
            html =  `<!DOCTYPE html>
<html ${ helmet.htmlAttributes.toString() }>
  <head>
    
    ${ helmet.title.toString() }
    ${ helmet.meta.toString() }
    ${ helmet.link.toString() }
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href="/build/index.css" rel="stylesheet" type="text/css"/>
    <link href="/build/antd.min.css" rel="stylesheet" type="text/css"/>

    <style>
    .ant-avatar-image img {
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

    
  </head>
  <body ${ helmet.bodyAttributes.toString() }>
    <root>${ bodyHtml }</root>   
    <script src="/build/index.js" type="text/javascript"></script>
  </body>
</html>
`;

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( html );
        });
}