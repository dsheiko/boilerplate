import { createAction } from "redux-actions";
import { FETCH_PEOPLE } from "../Constants";

// Creating asynchronous promisable actions
export const fetchPeople = createAction( FETCH_PEOPLE, async () => {
    const json = await fetch( "/people.json" ).then( rsp => rsp.json() );
    return json.results;
});

