const { join } = require( "path" ),
      SRC_FULL_PATH = join( __dirname, "./src/" ),
      PUBLIC_FULL_PATH = join( __dirname, "./build/" );

module.exports = {
    mode: "production",
    entry: {
      index: join( SRC_FULL_PATH, "index.js" )
    },
    output: {
      path: PUBLIC_FULL_PATH,
      filename: "[name].js",
      publicPath: "./build/",
      clean: true
    },
    resolve: {
       modules: [
        "node_modules",
        SRC_FULL_PATH
      ],
      extensions: [ ".js" ]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ "style-loader", "css-loader" ]
        },
        {
          test: /\.scss$/,
          use: [ "style-loader", "css-loader", "sass-loader" ]
        },
        {
          test: /\.(woff2?|svg|ttf|eot)(\?.*)?$/,
          type: "asset/inline"
        }
      ]
    }
};
