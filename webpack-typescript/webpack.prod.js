const { merge } = require( "webpack-merge" );
const baseConfig = require( "./webpack.common" );

module.exports = merge( baseConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js"
  }
} );
