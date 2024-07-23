const { join } = require( "path" ),
      pkg = require( "./package.json" ),
      { CleanWebpackPlugin } = require('clean-webpack-plugin'),
      MiniCssExtractPlugin = require( "mini-css-extract-plugin" ),
      LoadablePlugin = require( "@loadable/webpack-plugin" ),
      SRC_FULL_PATH = join( __dirname, "./frontend/src/" ),
      SRC_BACK_PATH = join( __dirname, "./backend/" ),
      PUBLIC_PATH = "./build/",
      PUBLIC_FULL_PATH = join( __dirname, "public", PUBLIC_PATH );

module.exports = {

    mode: process.env.NODE_ENV || "development",

    watchOptions: {
      ignored: /node_modules/
    },

    // Application entry scripts
    entry: {
      // script alias : path
      index : join( SRC_FULL_PATH, "index.jsx" )
      //server : join( SRC_BACK_PATH, "server.jsx" )
    },
    // Output configuration for Webpack
    output: {
			path: PUBLIC_FULL_PATH,
			filename: `[name].js`,
      publicPath: PUBLIC_PATH
    },

    resolve: {
       // Create aliases to import or require
       alias: {
        "~": SRC_FULL_PATH
       }, 
       modules: [
        "node_modules"
      ],
      extensions: [ ".js", ".jsx" ]
    },

    plugins: [
      // cleaning up the build directory prior to update
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
      new LoadablePlugin()
    ],

    module: {
			rules: [
         {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader" // translates CSS into CommonJS
          ]
        },
        {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                [ "@babel/preset-env", {
                  "targets": {
                    "browsers": [
                      ">1%",
                      "last 2 versions",
                      "Firefox ESR"
                    ]
                  }
                }]
              ],
              "plugins": [                
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }]
        }
			]
		}
};