import { utilBar } from "util/bar";

describe( "utilBar", () => {
  it( "returns intended value", () => {
    expect( utilBar() ).toEqual( "util-bar" );
  });
});