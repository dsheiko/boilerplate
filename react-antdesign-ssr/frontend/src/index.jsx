import React, { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { loadableReady } from "@loadable/component";
import { makeReactRoutes } from "./Containers/App.jsx";

import { Provider as ReduxProvider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "~/Store/app";

import "~/Sass/index.scss";
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
} from "react-router-dom";


// Create Redux store with state injected by the server
const store = configureStore({
  reducer: { app: appReducer }, 
  preloadedState: window.__PRELOADED_STATE__  
});

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;


loadableReady(() => {
   let router = createBrowserRouter( makeReactRoutes() );
   hydrateRoot(
      document.querySelector( "#root" ),
      <React.StrictMode>
        <ReduxProvider store={ store }>
          <RouterProvider router={router} fallbackElement={null} />
        </ReduxProvider>
      </React.StrictMode>
  );
});

