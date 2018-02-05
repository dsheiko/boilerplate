      // argv.p - port
      // argv.h - host
      // from command line or from defaults
const argv = { ...{
        p: 9002,
        h: "127.0.0.1"
      } , ...require( "minimist" )( process.argv.slice( 2 ) ) },

      server = require( "./server" );

// Starting the server
server.listen( argv.p, argv.h, () => {
  const { address, port } = server.address();
  console.log("Listening on %s:%d", address, port);
});
