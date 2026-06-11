const { join } = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

const SRC = join( __dirname, "src" );
const DIST = join( __dirname, "dist" );

module.exports = {
  entry: {
    index: join( SRC, "index.js" )
  },
  output: {
    path: DIST,
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    clean: true
  },
  resolve: {
    modules: [ "node_modules", SRC ],
    extensions: [ ".js" ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" })
  ]
};
