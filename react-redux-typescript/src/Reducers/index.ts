import { handleAction } from "redux-actions";
import { FETCH_PEOPLE } from "../Constants";

// Handling asynchronous promisable actions
export const appReducer = handleAction(
  FETCH_PEOPLE,
  ( state, action ) => ({ ...state, people: action.payload }),
  { people: [] }
);
