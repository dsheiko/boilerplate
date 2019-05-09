const { join } = require( "path" ),
      pkg = require( "./package.json" ),
      CleanWebpackPlugin = require( "clean-webpack-plugin" ),
      Dotenv = require( "dotenv-webpack" ),
      FRONT_FULL_PATH = join( __dirname, "./frontend/src/" ),
      SRC_FULL_PATH = join( __dirname, "./backend/src/" ),
      PUBLIC_FULL_PATH = join( __dirname, "./backend/build/" );

module.exports = {

    mode: process.env.NODE_ENV || "development",

    target: "node",

    watchOptions: {
      ignored: /node_modules/
    },

    // Application entry scripts
    entry: {
      // script alias : path
      index : join( SRC_FULL_PATH, "index.jsx" )

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
      // cleaning up the build directory prior to update
      new CleanWebpackPlugin([ PUBLIC_FULL_PATH ]),
      new Dotenv()
    ],

    module: {
			rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: [
                "react",
                [ "env", {
                  "targets": {
                    "browsers": [
                      ">1%",
                      "last 2 versions",
                      "Firefox ESR"
                    ]
                  }
                }]
              ],
              plugins: [
                "transform-class-properties",
                "transform-object-rest-spread",
                "babel-plugin-syntax-dynamic-import",
                "transform-runtime",
                "transform-decorators-legacy"
              ]
            }
          }]
        }
			]
		}
};