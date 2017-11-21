# Starter template for RequireJS + Babel

The bundle contains sample SASS sources that are being transpiled in CSS and transformed with [Autoprefixer](https://github.com/postcss/autoprefixer) tool

## Available Automation Commands
- `npm run build` - build app
- `npm start` - start app

## package.json

- `babel-cli` - [Babel CLI](https://babeljs.io/docs/usage/cli/)
- `babel-plugin-transform-es2015-modules-amd` - [Babel plugin](https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-amd) to handle AMD
- `babel-preset-env` - [Babel env preset](https://github.com/babel/babel-preset-env) to include all the plugins required for target environment automatically
- `babel-plugin-transform-runtime` - [Runtime transform](https://babeljs.io/docs/plugins/transform-runtime/) to inject polyfills required according to `Babel env preset` configuration
- `http-server` - [Command-line http server](https://github.com/indexzero/http-server)
