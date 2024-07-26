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
import * as actions from "~/Actions/app";
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
        const store = configureStore( DEFAULT_STATE, req.url );

        let fetchRequest = createFetchRequest( req, res );
        let context = await handler.query( fetchRequest );
        let router = createStaticRouter(
            handler.dataRoutes,
            context
        );

        const jsx = ( <ReduxProvider store={ store }>
                <StaticRouterProvider
                    router={router}
                    context={context}
                    nonce="the-nonce"
                />
            </ReduxProvider> ),
            tpl = fs.readFileSync( path.join( __dirname, "..", "Template", "index.tpl" ), "utf8" ),
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
}