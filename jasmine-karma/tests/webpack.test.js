const { join } = require( "path" ),
      merge = require( "webpack-merge" ),
      baseConfig = require( "../webpack.dev" );
      SRC_FULL_PATH = join( __dirname ),
      PUBLIC_PATH = "./build/",
      PUBLIC_FULL_PATH = join( __dirname, PUBLIC_PATH );

// Extending DEV configuration
module.exports = merge( baseConfig, {

    // Overriding application entry scripts
    entry: {
      index : join( SRC_FULL_PATH, "specs.js" )
    },

    // Overriding output configuration for Webpack
    output: {
			path: PUBLIC_FULL_PATH,
			filename: `[name].js`,
      chunkFilename: `[name].chunk.js`,
      publicPath: PUBLIC_PATH
    }

});
