import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import app, { DEFAULT_STATE as APP_DEFAULT_STATE } from "./app";

export const DEFAULT_STATE = { app: APP_DEFAULT_STATE };
export default ( history ) => combineReducers({
  app,
  router: connectRouter( history )
});