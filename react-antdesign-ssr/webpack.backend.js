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

    // JavaScript (*.js) module paths to be resolved relatively to node_modules and SRC_FULL_PATH
    // e.g. if we have `import "mymodule"`
    // Webpack looks up in node_modules/mymodule/ according to Node.js module loading convention
    // https://nodejs.org/api/modules.html
    // and checks SRC_FULL_PATH/mymodule.js
    resolve: {
       modules: [
        "node_modules",
        FRONT_FULL_PATH
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