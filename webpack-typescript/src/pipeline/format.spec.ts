import { toSummary } from "./format";
import type { AppEvent } from "../types";

describe( "toSummary", () => {
  it( "formats event with a label", () => {
    const input: AppEvent[] = [
      { id: 1, type: "click", target: { id: "btn", label: "Submit" }, meta: null }
    ];
    expect( toSummary( input )[ 0 ].summary ).toBe( "[CLICK] Submit" );
  } );

  it( "falls back to target id when label is missing", () => {
    const input: AppEvent[] = [
      { id: 2, type: "click", target: { id: "btn-cancel" }, meta: null }
    ];
    expect( toSummary( input )[ 0 ].summary ).toBe( "[CLICK] btn-cancel" );
  } );

  it( "falls back to 'unknown' when target is null", () => {
    const input: AppEvent[] = [
      { id: 3, type: "scroll", target: null, meta: { threshold: 100 } }
    ];
    expect( toSummary( input )[ 0 ].summary ).toBe( "[SCROLL] unknown (threshold: 100px)" );
  } );

  it( "appends debounce from meta", () => {
    const input: AppEvent[] = [
      { id: 4, type: "input", target: { id: "search", label: "Search" }, meta: { debounce: 300 } }
    ];
    expect( toSummary( input )[ 0 ].summary ).toBe( "[INPUT] Search (debounce: 300ms)" );
  } );
} );
