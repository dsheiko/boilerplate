import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./Containers/App.jsx";
import { appReducer } from "./Reducers";
import promiseMiddleware from "redux-promise";  // Support for promisable actions
import thunkMiddleware from "redux-thunk"; // Support for asynchronous actions

// Store enhancement
const storeEnhancer = composeWithDevTools( compose(
        applyMiddleware(
          thunkMiddleware,
          promiseMiddleware
        )
      ) ),
      // Store creation
      store = createStore(
        appReducer,
        storeEnhancer
      );

render( <Provider store={store}>
  <App />
</Provider>, document.querySelector( "root" ) );

