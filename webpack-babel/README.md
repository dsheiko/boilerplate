# Starter template for Webpack and Babel

The bundle contains sample application, made of ES modules in ES.Next syntax.
The application uses Webpack to bundle the modules. It shows how to to import static and dynamic ES modules, by relative and resolvable paths. It also demonstrates an optimization technic where we provide separate bundles for modern browsers and legacy ones. So when the application requested in ever-green browser it doesn't need to load all the polyfills required for outdated user-agents.

## Building application
* When building for dev environment we use [webpack.dev.js](./webpack.dev.js) configuration, which extends [webpack.common.js](./webpack.common.js). It transpiles source modules in JavaScript with the only support for modern user-agents [as specified in the configuration](./webpack.dev.js).
* When building for production environment we use [webpack.prod.js](./webpack.prod.js) configuration, which extends [webpack.dev.js](./webpack.dev.js). It minifies the compiled JavaScript. Next we run [webpack.prod-legacy.js](./webpack.prod-legacy.js). It transpiles source modules in JavaScript with the support for legacy user-agents [as specified in the configuration](./webpack.prod-legacy.js).
* From the [index.html](./index.html) (as stated [here](https://speakerdeck.com/addyosmani/fast-by-default-modern-loading-best-practices)) we load conditionally the generated bundle either for modern browsers `./build/index.js` or for legacy ones ./build/legacy/index.js

## Available Commands
- `npm run build:dev` - build app for dev environment
- `npm run build:prod` - build app for dev environment
- `npm run watch` - watch for updates in the code base
- `npm start` - start app
- `npm run lint:js` - ensure the code follows the code style conventions
- `npm run lint:js:fix` - adjust the code automatically according to the code style conventions

## package.json

- `babel-cli` - [Babel CLI](https://babeljs.io/docs/usage/cli/)
- `babel-loader` - [Babel loader for Webpack](https://github.com/babel/babel-loader)
- `babel-preset-env` - [Babel env preset](https://github.com/babel/babel-preset-env) to include all the plugins required for target environment automatically
- `babel-plugin-transform-class-properties`  - [Babel plugin](https://babeljs.io/docs/plugins/transform-class-properties/) to unlock class properties of ES8
- `babel-plugin-transform-object-rest-spread` - [Babel plugin](https://babeljs.io/docs/plugins/transform-object-rest-spread/) to unlock desctructuring in objects
- `babel-plugin-transform-runtime` - [Runtime transform](https://babeljs.io/docs/plugins/transform-runtime/) to inject polyfills required according to `Babel env preset` configuration
- `babel-plugin-syntax-dynamic-import` - [Babel plugin](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import) to unlock lazy-loading for modules
- `clean-webpack-plugin` - [Babel plugin](https://github.com/johnagan/clean-webpack-plugin) to clean up build directory before compilation
- `uglifyjs-webpack-plugin` - [Babel plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) to minify & optimize built code
- `http-server` - [Command-line http server](https://github.com/indexzero/http-server)
- `webpack` - [Webpack bundler](https://github.com/webpack/webpack)

## Webpack Configuration Overview

```
module.exports = {
    entry: <Path to the entry script(s). It accepts a string or an array of strings>
    output: {
			path: <Output directory>,
			filename: <Bundle name>,
      chunkFilename: <Name template for dynamically loaded chunks>,
      publicPath: <Output directory by HTTP>
    },

    <Resolving...>
    resolve: {
      modules: <Directories considered as root for modules. It accepts an array of strings>,
      extensions: [ ".js" ]
    },

    module: {
			rules: [
        {
          test: <filename pattern to match>,
          use: [<loader configuration>]
        }
			]
		}
};
```

## Webpack Environment-specific Configurations

- `webpack.common.js` - base configuration
- `webpack.dev.js` - configuration for dev environment (extends `webpack.common.js`)
- `webpack.prod.js` - configuration for production environment (extends `webpack.dev.js`, aims modern browsers)
- `webpack.prod-legacy.js` - configuration for production environment (extends `webpack.dev.js`, aims legacy browsers)