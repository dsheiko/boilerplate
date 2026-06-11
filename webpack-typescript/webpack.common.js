const { join } = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

const SRC = join( __dirname, "src" );
const DIST = join( __dirname, "dist" );

module.exports = {
  entry: {
    index: join( SRC, "index.ts" )
  },
  output: {
    path: DIST,
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    clean: true
  },
  resolve: {
    modules: [ "node_modules", SRC ],
    extensions: [ ".ts", ".js" ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" })
  ]
};
