const { join } = require( "path" ),
      pkg = require( "./package.json" ),
      nodeExternals = require( "webpack-node-externals" ),
      { CleanWebpackPlugin } = require('clean-webpack-plugin'),
      MiniCssExtractPlugin = require( "mini-css-extract-plugin" ),
      Dotenv = require( "dotenv-webpack" ),
      FRONT_FULL_PATH = join( __dirname, "./frontend/src/" ),
      SRC_FULL_PATH = join( __dirname, "./backend/" ),
      PUBLIC_FULL_PATH = join( __dirname, "./backend/build/" );

module.exports = {

    mode: process.env.NODE_ENV || "development",

    target: "node",

    externals: [ nodeExternals() ],

    watchOptions: {
      ignored: /node_modules/
    },

    // Application entry scripts
    entry: {
      // script alias : path
      server : join( SRC_FULL_PATH, "server.jsx" )

    },
    // Output configuration for Webpack
    output: {
			path: PUBLIC_FULL_PATH,
			filename: `[name].js`
    },

    resolve: {
      // Create aliases to import or require
      alias: {
        "~~": SRC_FULL_PATH,
        "~": FRONT_FULL_PATH
       }, 
       modules: [
        "node_modules"
      ],
      extensions: [ ".js", ".jsx" ]
    },

    plugins: [
      new Dotenv()
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