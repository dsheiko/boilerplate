import { byTypes } from "./filter";
import type { AppEvent } from "../types";

const events: AppEvent[] = [
  { id: 1, type: "click",  target: { id: "a" }, meta: null },
  { id: 2, type: "input",  target: { id: "b" }, meta: null },
  { id: 3, type: "scroll", target: null,         meta: null }
];

describe( "byTypes", () => {
  it( "keeps only events with matching types", () => {
    const result = byTypes( "click", "input" )( events );
    expect( result ).toHaveLength( 2 );
    expect( result.map( ( e ) => e.type ) ).toEqual( [ "click", "input" ] );
  } );

  it( "returns empty array when no types match", () => {
    expect( byTypes( "focus" )( events ) ).toHaveLength( 0 );
  } );

  it( "returns all events when all types match", () => {
    expect( byTypes( "click", "input", "scroll" )( events ) ).toHaveLength( 3 );
  } );
} );
