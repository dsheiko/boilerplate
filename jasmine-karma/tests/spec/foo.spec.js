import { utilFoo } from "util/foo";

describe( "utilFoo", () => {
  it( "returns intended value", () => {
    expect( utilFoo() ).toEqual( "util-foo" );
  });
});