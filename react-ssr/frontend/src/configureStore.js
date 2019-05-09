import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";  // Support for promisable actions
import thunkMiddleware from "redux-thunk"; // Support for asynchronous actions
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./Reducers";

export const history = createBrowserHistory();

export default function configureStore() {
// Store enhancement
const storeEnhancer = composeWithDevTools(
        applyMiddleware(
          thunkMiddleware,
          promiseMiddleware,
          routerMiddleware( history )
        )
      );

    // Store creation
    return createStore(
      createRootReducer( history ),
      //, preloadedState
      storeEnhancer
    );
}
