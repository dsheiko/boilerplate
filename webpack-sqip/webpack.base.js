const { join } = require( "path" ),
      pkg = require( "./package.json" ),
      webpack = require( "webpack" ),
      { CleanWebpackPlugin } = require( "clean-webpack-plugin" ),
      SRC_FULL_PATH = join( __dirname, "./src/" ),
      PUBLIC_PATH = "./build/",
      PUBLIC_FULL_PATH = join( __dirname, PUBLIC_PATH );


module.exports = {
    mode: process.env.NODE_ENV || "development",
    target: "node",
    // Application entry scripts
    entry: {
      // script alias : path
      index : join( SRC_FULL_PATH, "index.jsx" )
    },
    // Output configuration for Webpack
    output: {
			path: PUBLIC_FULL_PATH,
			filename: `[name].js`,
      publicPath: PUBLIC_PATH
    },

    watchOptions: {
      ignored: /node_modules/
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
      new CleanWebpackPlugin()
    ],

    module: {
			rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
        }]
      }
      ]
		}
};
