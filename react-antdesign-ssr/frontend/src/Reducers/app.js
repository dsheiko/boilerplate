import update from "immutability-helper";
import { constants as _ } from "~/Actions/app";

const TABLE_OPTS = {
  rows: [],
  total: 0,
  loading: false,
  errorMessage: "",
  preloaded: false
};


export const DEFAULT_STATE = {
  loading: false,
  menu: [ "Item1" ],
  tables: {
    SettingsProjectTable: { ...TABLE_OPTS }
  }
};


export default function app( state = DEFAULT_STATE, action ) {
  switch ( action.type ) {
    case _.SET_APP:
      return update( state, {
        $merge: action.payload
      });

    case _.SET_TABLE:
      return update( state, {
        tables: {
          [ action.id ]: {
            $merge: action.payload
          }
        }
      });
    default:
      return state
  }
}