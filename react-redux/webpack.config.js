const { join } = require( "path" ),
      pkg = require( "./package.json" ),
      CleanWebpackPlugin = require( "clean-webpack-plugin" ),
      SRC_FULL_PATH = join( __dirname, "./src/" ),
      PUBLIC_PATH = "./build/",
      PUBLIC_FULL_PATH = join( __dirname, PUBLIC_PATH );

module.exports = {
  
    mode: "development",

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
			filename: `[name].js`,
      chunkFilename: `[name].v${pkg.version}.widget.js`,
      publicPath: PUBLIC_PATH
    },

    // JavaScript (*.js) module paths to be resolved relatively to node_modules and SRC_FULL_PATH
    // e.g. if we have `import "mymodule"`
    // Webpack looks up in node_modules/mymodule/ according to Node.js module loading convention
    // https://nodejs.org/api/modules.html
    // and checks SRC_FULL_PATH/mymodule.js
    resolve: {
       modules: [
        "node_modules",
        SRC_FULL_PATH
      ],
      extensions: [ ".js", ".jsx" ]
    },

    plugins: [
      // cleaning up the build directory prior to update
      new CleanWebpackPlugin([ PUBLIC_PATH ])
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