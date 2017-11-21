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
      index : join( SRC_FULL_PATH, "index.ts" )
    },
    // Output configuration for Webpack
    output: {
			path: PUBLIC_FULL_PATH,
			filename: `[name].js`,
      chunkFilename: `[name].v${pkg.version}.widget.js`,
      publicPath: PUBLIC_PATH
    },

    resolve: {
       modules: [
        "node_modules",
        SRC_FULL_PATH
      ],
      extensions: [ ".ts" ]
    },

    plugins: [
      // cleaning up the build directory prior to update
      new CleanWebpackPlugin([ PUBLIC_PATH ])
    ],

    devtool: "source-map", // enum
    module: {
			rules: [
				{
					// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
					test: /\.tsx?$/,
					use: "ts-loader"
				}

			]
		}
};
