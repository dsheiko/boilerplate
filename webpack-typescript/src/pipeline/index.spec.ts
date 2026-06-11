import { Pipeline } from "./index";

describe( "Pipeline", () => {
  it( "runs transforms in sequence", () => {
    const result = new Pipeline<number[]>()
      .add( ( items ) => items.filter( ( n ) => n > 1 ) )
      .add( ( items ) => items.map( ( n ) => n * 2 ) )
      .run( [ 1, 2, 3 ] );
    expect( result ).toEqual( [ 4, 6 ] );
  } );

  it( "returns data unchanged when no transforms are added", () => {
    const result = new Pipeline<number[]>().run( [ 1, 2, 3 ] );
    expect( result ).toEqual( [ 1, 2, 3 ] );
  } );

  it( "supports method chaining", () => {
    const pipeline = new Pipeline<string[]>();
    expect( pipeline.add( ( x ) => x ) ).toBe( pipeline );
  } );
} );
