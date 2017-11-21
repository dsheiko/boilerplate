import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import App from "./Containers/App";
import { appReducer } from "./Reducers";
import * as promiseMiddleware from "redux-promise";  // Support for promisable actions
import thunkMiddleware from "redux-thunk"; // Support for asynchronous actions

// Store enhancement
const storeEnhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware
  )
);
// Store creation
const store = createStore(
  appReducer,
  storeEnhancer
);

render( <Provider store={store}>
  <App {...this.props} />
 </Provider>, document.querySelector( "root" ) );
