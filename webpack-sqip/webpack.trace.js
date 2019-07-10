const { join } = require( "path" ),
      merge = require( "webpack-merge" ),
      base = require( "./webpack.base" );


module.exports = merge( base, {

    module: {
			rules: [
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            {
              loader: "image-trace-loader"
            },
            {
              loader: "file-loader",
              options: {
                name: "src-[name].[ext]"
              }
            },
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true // webpack@2.x and newer
              }
            }
          ]
        }
      ]
		}
} );
