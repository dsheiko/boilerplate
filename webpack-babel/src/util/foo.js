export function utilFoo() {
    // calling a few ES.Next methods to see the corresponding polyfills join the legacy build
    [ 1, 2, 3 ].fill( 4 ).find( i => i === 4 );
    return "util-foo";
}
