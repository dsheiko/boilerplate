/**
 * Test server provides running environment for E2E tests.
 * The server fires up static http server, runs E2E and stops the server on testing complete
 */
const express = require( "express" ),
      { spawn } = require( "child_process" ),
      argv = require( "minimist" )( process.argv.slice( 2 ) ),
      port = 8080,
      host = "localhost",
      app = express();

app.use( express.static( "../demo/bootstrap" ) );

app.listen( port, host, () => {
    console.log( `Starting up tests-server as http://${host}:${port}` );

    const npx = spawn( "npx", argv.debug
    ? [ "cross-env", "DEBUG=true", "jest", "--detectOpenHandles" ]
    : [ "cross-env", "NODE_ENV=test", "jest" ] );

    npx.stdout.on('data', ( data ) => {
      process.stdout.write( data );
    });

    npx.stderr.on('data', ( data ) => {
      process.stdout.write( data );
    });

    npx.on('error', ( err ) => {
      console.log( err );
      process.exit( 1 );
    });

    npx.on('close', () => {
      process.exit( 0 );
    });

});