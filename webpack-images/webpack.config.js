const { join } = require( "path" ),
      pkg = require( "./package.json" ),
      CleanWebpackPlugin = require( "clean-webpack-plugin" ),
      SRC_FULL_PATH = join( __dirname, "./src/" ),
      PUBLIC_PATH = "./build/",
      PUBLIC_FULL_PATH = join( __dirname, PUBLIC_PATH );

module.exports = {
    // Application entry scripts
    entry: {
      // script alias : path
      index : join( SRC_FULL_PATH, "index.js" )
    },
    // Output configuration for Webpack
    output: {
			path: PUBLIC_FULL_PATH,
			filename: `[name].js`,
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
      extensions: [ ".js" ]
    },

    plugins: [
      // cleaning up the build directory prior to update
      new CleanWebpackPlugin([ PUBLIC_PATH ])
    ],

    module: {
			rules: [
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]?[hash]"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true
              }
            }
          ]
        }
      ]
    }
};