# Starter template for Karma + Jasmine

The bundle contains JavaScript sample application and unit-tests.
Tests are written by using [Jasmine](https://jasmine.github.io/) testing framework, that runs in [Karma test runner](https://karma-runner.github.io/1.0/index.html) configured for headless Chrome

## Available Automation Commands
- `npm run build` - build app
- `npm test` - run unit-tests

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
- `jasmine-core` - [Jasmin Testing Framework](https://jasmine.github.io/)
- `karma` - [Karma Runner](https://karma-runner.github.io)
- `karma-chrome-launcher` - [Chrome Launcher for Karma](https://github.com/karma-runner/karma-chrome-launcher)
- `karma-cli` - [Karma Runner CLI](https://github.com/indexzero/http-server) to run run Karma from command line
- `karma-jasmine` - [Karma plugin](https://github.com/karma-runner/karma-jasmine) to handle Jasmine
- `karma-spec-reporter` - [Karma plugin](https://github.com/mlex/karma-spec-reporter) test reporter, that prints detailed results to console


