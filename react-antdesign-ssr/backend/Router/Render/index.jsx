import React from "react";
import fs from "node:fs";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { 
    createStaticHandler,
    createStaticRouter, 
    StaticRouterProvider } from "react-router-dom/server";
import { ChunkExtractor } from '@loadable/server'
import { makeReactRoutes } from "~/Containers/App";
import createFetchRequest from "./request-adapter";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { DEFAULT_STATE } from "~/Reducers";
import configureStore from "../../configureStore";
import { getProjects } from "./selectors";
import pkg from "../../../package.json";
import { extractStyle } from '@ant-design/static-style-extract';


const PUBLIC_PATCH = path.resolve( __dirname + "/../../public/build" ),
      ANTD_CSS_FILE = path.join( PUBLIC_PATCH, "antd.min.css" ),
      extractor = new ChunkExtractor({ statsFile: path.join( PUBLIC_PATCH, "loadable-stats.json" ) });

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