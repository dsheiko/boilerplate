import React, { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { loadableReady } from "@loadable/component";
import { routes } from "./Containers/App.jsx";
import configureStore from "./configureStore";
import "antd/dist/antd.css";
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

loadableReady(() => {
   let router = createBrowserRouter( routes );
   hydrateRoot(
      document.querySelector( "root" ),
      <React.StrictMode>
        <Provider store={ store }>
          <RouterProvider router={router} fallbackElement={null} />
        </Provider>
      </React.StrictMode>
  );
});

