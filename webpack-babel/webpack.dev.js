const merge = require( "webpack-merge" ),
      baseConfig = require( "./webpack.common" );

// Extending COMMON configuration
module.exports = merge( baseConfig, {

    mode: "development",

    module: {
			rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: [ [ "@babel/preset-env", {
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
                "useBuiltIns": "entry",
                "debug": false
              }] ],
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-runtime"
              ]
            }
          }]
        }
			]
		}
});