const [ major ] = process.versions.node.split( "." ).map( Number ),
      MIN_NODE_VER = 18;
try {      
    if ( major < MIN_NODE_VER ) {
        throw new Error( `You are using Node.js ${ process.versions.node }. ` 
            + `For the app, Node.js version >= v${  MIN_NODE_VER } is required.` );
    }
    require( "./backend/build/server" );
} catch ( e ) {
    console.log( `\nERROR: ${ e.message }\n\n` );
}