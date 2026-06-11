const { mkdirSync } = require( "fs" );
const { PATH_SCREENSHOTS } = require( "./constants" );

mkdirSync( PATH_SCREENSHOTS, { recursive: true } );

exports.png = ( name ) => ({ path: `${PATH_SCREENSHOTS}/${name}.png` });