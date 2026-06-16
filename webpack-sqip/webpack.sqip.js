const merge = require( "webpack-merge" ),
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
                mode: 0,
                blur: 12
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
                bypassOnDebug: true,
                disable: true
              }
            }
          ]
        }
      ]
    }
} );
