const { join } = require( "path" ),
      ImageMinimizerPlugin = require( "image-minimizer-webpack-plugin" ),
      SRC_FULL_PATH = join( __dirname, "./src/" ),
      PUBLIC_FULL_PATH = join( __dirname, "./build/" );

module.exports = {
    mode: "production",
    entry: {
      index: join( SRC_FULL_PATH, "index.js" )
    },
    output: {
      path: PUBLIC_FULL_PATH,
      filename: "[name].js",
      publicPath: "./build/",
      clean: true,
      assetModuleFilename: "[path][name][ext]"
    },
    resolve: {
       modules: [
        "node_modules",
        SRC_FULL_PATH
      ],
      extensions: [ ".js" ]
    },
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          type: "asset/resource"
        }
      ]
    },
    optimization: {
      minimizer: [
        "...",
        new ImageMinimizerPlugin( {
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                jpeg: { quality: 80 },
                png: { quality: 80 },
                gif: {},
              }
            }
          }
        } )
      ]
    }
};
