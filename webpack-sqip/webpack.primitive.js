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
              loader: "sqip-loader",
              options: {
                numberOfPrimitives: 20,
                mode: 1,
                blur: 0
              }
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
