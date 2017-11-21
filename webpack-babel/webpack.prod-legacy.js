const merge = require( "webpack-merge" ),
      baseConfig = require( "./webpack.prod" ),
      CleanWebpackPlugin = require( "clean-webpack-plugin" ),
      { join } = require( "path" ),
      PUBLIC_PATH = "./build/legacy/",
      PUBLIC_FULL_PATH = join( __dirname, PUBLIC_PATH );

// Extending PROD configuration
module.exports = merge({
  // merge hook (@see https://github.com/survivejs/webpack-merge)
  customizeArray( baseCfg, extCfg, key ) {
    if ( key === "plugins" ) {
      // remove CleanWebpackPlugin from plugins
      // because by running prod-legacy we extend build, not replace it
      return baseCfg.filter( plugin => !( plugin instanceof CleanWebpackPlugin ) );
    }
    return undefined;
  },
  // merge hook
  customizeObject( baseCfg, extCfg, key ) {
    if ( key === "module" ) {
      // find module.rules[].use[].options.presets[] matching "babel-loader"
      const rule = baseCfg.rules.find( rule => rule.use.find( uc => uc.loader === "babel-loader" ) ),
            usecase = rule.use.find( uc => uc.loader === "babel-loader" ),
            preset = usecase.options.presets.find( ( [ name ] ) => name === "env" );
      // replace ENV browsers configuration
      preset[ 1 ].targets.browsers = [
        ">1%",
        "last 2 versions",
        "Firefox ESR"
      ];
    }
    return undefined;
  }
})( baseConfig, {
  // Output build scripts in ./legacy/ directory
  output: {
    path: PUBLIC_FULL_PATH,
    publicPath: PUBLIC_PATH
  },

  plugins: [],
  module: {}
});
