const rspack = require( "@rspack/core" );
const { join } = require( "path" );

const SRC = join( __dirname, "src" );
const DIST = join( __dirname, "dist" );

module.exports = ( env, argv ) => {
  const isDev = argv.mode === "development";
  return {
    entry: {
      index: join( SRC, "index.js" )
    },
    output: {
      path: DIST,
      filename: isDev ? "[name].js" : "[name].[contenthash].js",
      chunkFilename: isDev ? "[name].chunk.js" : "[name].[contenthash].chunk.js",
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
      new rspack.HtmlRspackPlugin({ template: "./index.html" })
    ],
    devServer: {
      port: 8080,
      open: true,
      hot: true
    },
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map"
  };
};
