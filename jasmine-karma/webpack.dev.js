const merge = require( "webpack-merge" ),
      baseConfig = require( "./webpack.common" );

// Extending COMMON configuration
module.exports = merge( baseConfig, {

    module: {
			rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: [ [ "env", {
                "targets": {
                  "browsers": [
                    "Chrome >= 60",
                    "Safari >= 10.1",
                    "iOS >= 10.3",
                    "Firefox >= 54",
                    "Edge >= 15"
                  ]
                },
                "modules": false,
                "useBuiltIns": true,
                "debug": false
              }] ],
              plugins: [
                "transform-class-properties",
                "transform-object-rest-spread",
                "babel-plugin-syntax-dynamic-import",
                "transform-runtime"
              ]
            }
          }]
        }
			]
		}
});