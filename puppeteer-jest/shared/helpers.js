const { PATH_SCREENSHOTS } = require( "./constants" );

exports.png = ( name ) => ({ path: `${PATH_SCREENSHOTS}/${name}.png` });