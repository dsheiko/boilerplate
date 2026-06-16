import { writable } from "svelte/store";

export const people = writable( [] );

export async function fetchPeople() {
  const response = await fetch( "/people.json" );
  const data = await response.json();
  people.set( data.results );
}
