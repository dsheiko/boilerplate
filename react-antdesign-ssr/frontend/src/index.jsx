import React, { StrictMode } from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";
import App from "./Containers/App.jsx";
import configureStore from "./configureStore";
import "antd/dist/antd.css";
import "~/Sass/index.scss";

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__,
      store = configureStore( preloadedState );
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

loadableReady(() => {
  hydrate( <StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>, document.querySelector( "root" ) );
});

