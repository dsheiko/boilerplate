import { createStore } from "solid-js/store";

const [state, setState] = createStore({
  people: []
});

export async function fetchPeople() {
  const response = await fetch( "/people.json" );
  const data = await response.json();
  setState( "people", data.results );
}

export { state };
