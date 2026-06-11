const { merge } = require( "webpack-merge" );
const baseConfig = require( "./webpack.common" );

module.exports = merge( baseConfig, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 8080,
    open: true,
    hot: true
  }
} );
