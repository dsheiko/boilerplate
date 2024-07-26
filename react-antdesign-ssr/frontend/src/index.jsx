import React, { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
//import { loadableReady } from "@loadable/component";
import { routes } from "./Containers/App.jsx";
import configureStore from "./configureStore";

import "~/Sass/index.scss";
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
} from "react-router-dom";



// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__,
      store = configureStore( preloadedState );
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;


async function hydrate() {
  // Determine if any of the initial routes are lazy
  let lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        let routeModule = await m.route.lazy();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      })
    );
  }

   let router = createBrowserRouter( routes );
   hydrateRoot(
      document.querySelector( "root" ),
      <React.StrictMode>
        <Provider store={ store }>
          <RouterProvider router={router} fallbackElement={null} />
        </Provider>
      </React.StrictMode>
  );

}

 hydrate();

// loadableReady(() => {
  
// });

