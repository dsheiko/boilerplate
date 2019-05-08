require( "dotenv" ).config();
      // argv.p - port
      // argv.h - host
      // from command line or from defaults
const argv = { ...{
        p: process.env.DEMO_NODE_SERVER_PORT,
        h: process.env.DEMO_NODE_SERVER_HOST
      } , ...require( "minimist" )( process.argv.slice( 2 ) ) },

      dbg = require( "debug" ),

      server = require( "./backend/server" );

// Starting the server
server.listen( argv.p, argv.h, () => {
  const { address, port } = server.address();
  dbg( "INFO" )( `Node.js server listening on ${ address }:${ port }` );
});
