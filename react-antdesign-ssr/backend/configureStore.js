import promiseMiddleware from "redux-promise";  // Support for promisable actions
import thunkMiddleware from "redux-thunk"; // Support for asynchronous actions
import { createMemoryHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "~/Reducers";


export let history;

export default function configureStore( initialState, url ) {
    history = createMemoryHistory({
      initialEntries: [ url ]
    });
    // Store enhancement
    const storeEnhancer = compose(
        applyMiddleware(
          thunkMiddleware,
          promiseMiddleware,
          routerMiddleware( history )
        )
      );

    // Store creation
    return createStore(
      createRootReducer( history ),
      initialState,
      storeEnhancer
    );
}
