import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./Containers/App.jsx";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import "antd/dist/antd.css";
import "~/Sass/index.scss";

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__,
      store = configureStore( preloadedState );
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

render( <Provider store={ store }>
<ConnectedRouter history={ history }>
  <App />
</ConnectedRouter>
</Provider>, document.querySelector( "root" ) );


