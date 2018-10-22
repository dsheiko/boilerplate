const merge = require( "webpack-merge" ),
      baseConfig = require( "./webpack.dev" ),
      TerserPlugin = require( "terser-webpack-plugin" );

// Extending DEV configuration
module.exports = merge( baseConfig, {
    mode: "production",

    optimization: {
      minimizer: [new TerserPlugin()]
    }

});