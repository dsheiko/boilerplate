const merge = require( "webpack-merge" ),
      baseConfig = require( "./webpack.dev" ),
      UglifyJSPlugin = require( "uglifyjs-webpack-plugin" );

// Extending DEV configuration
module.exports = merge( baseConfig, {

    plugins: [
      // Optimize & minimize for production
      new UglifyJSPlugin()
    ]

});