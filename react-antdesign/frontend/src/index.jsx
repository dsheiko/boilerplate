import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./Containers/App.jsx";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import "antd/dist/antd.css";
import "Sass/index.scss";

const store = configureStore();

render( <Provider store={ store }>
<ConnectedRouter history={ history }>
  <App />
</ConnectedRouter>
</Provider>, document.querySelector( "root" ) );

