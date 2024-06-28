import React from "react";
import fs from "fs";
import path from "path";
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter } from "react-router";
import App from "~/Containers/App";
import * as actions from "~/Actions/app";
import SettingsProjectTable from "~/Components/Main/Settings/Project/SettingsProjectTable";
import { DEFAULT_STATE } from "~/Reducers";
import configureStore from "../../configureStore";
import { getProjects } from "./selectors";
import pkg from "../../../package.json";

// Prefetching wiht Loadable
// @see https://loadable-components.com/docs/server-side-rendering/
const statsFile = path.join( __dirname,  "../build/loadable-stats.json" ),
      extractor = new ChunkExtractor({ statsFile, entrypoints: [ "server" ] })

export default function renderRoutes( router, { projectModel } ) {
	
    router.get(/.*/, async ( req, res ) => {
        const store = configureStore( DEFAULT_STATE, req.url );

        await store.dispatch( actions.setTable( SettingsProjectTable.displayName, await getProjects( projectModel ) ) );


        const jsx = extractor.collectChunks( <ReduxProvider store={ store }>
                <StaticRouter context={ DEFAULT_STATE } location={ req.url }>
                    <App />
                </StaticRouter>
            </ReduxProvider> ),
            tpl = fs.readFileSync( path.join( __dirname, "..", "Template", "index.tpl" ), "utf8" ),
            html = tpl
                .replace( `{{ROOT}}`, renderToString( jsx ) )
                .replace( `{{__LINK_TAGS__}}`, extractor.getLinkTags() )
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