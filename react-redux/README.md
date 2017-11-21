# Starter template for React + Redux

The bundle contains React/Redux sample application, made of ES modules and ready-made components of [Material UI Next](https://material-ui-next.com).
The application represents the fundamental patterns of React 16.

## Available Automation Commands
- `npm run build` - build app
- `npm run watch` - watch for updates in the code base
- `npm start` - start app
- `npm run lint:js` - ensure the code follows the code style conventions (see [.jscsrc](./.jscsrc))
- `npm run lint:js:fix` - adjust the code automatically according to the code style conventions

## References

| Location  | Pattern |
| ------------- | ------------- |
| ./src/Components/Header.jsx | Functional component  |
| ./src/Components/Main.jsx   | Class component  |
| ./src/Components/Row.jsx    | Runtime type checking for React props  |
| ./src/Components/Main.jsx   | Error Boundaries  |
| -//-                        | Life-cycle methods  |
| ./src/Containers/App.jsx    | Using store connect as a decorator  |
| -//-                        | Mapping state and actions to the props  |
| ./src/Actions/index.js      | Creating asynchronous promisable actions  |
| ./src/Reducers/index.js     | Handling asynchronous promisable actions  |
| ./src/index.jsx             | Store creation and enhancement  |

## package.json

- `babel-cli` - [Babel CLI](https://babeljs.io/docs/usage/cli/)
- `babel-loader` - [Babel loader for Webpack](https://github.com/babel/babel-loader)
- `babel-preset-env` - [Babel env preset](https://github.com/babel/babel-preset-env) to include all the plugins required for target environment automatically
- `babel-plugin-transform-class-properties`  - [Babel plugin](https://babeljs.io/docs/plugins/transform-class-properties/) to unlock class properties of ES8
- `babel-plugin-transform-object-rest-spread` - [Babel plugin](https://babeljs.io/docs/plugins/transform-object-rest-spread/) to unlock desctructuring in objects
- `babel-plugin-transform-runtime` - [Runtime transform](https://babeljs.io/docs/plugins/transform-runtime/) to inject polyfills required according to `Babel env preset` configuration
- `babel-plugin-syntax-dynamic-import` - [Babel plugin](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import) to unlock lazy-loading for modules
- `babel-plugin-transform-decorators-legacy` - [Babel plugin](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) to unlock decorators
- `babel-preset-react` - [Babel preset](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) for React
- `jscs` - [JavaScript code linter](http://jscs.info/)
- `clean-webpack-plugin` - [Babel plugin](https://github.com/johnagan/clean-webpack-plugin) to clean up build directory before compilation
- `uglifyjs-webpack-plugin` - [Babel plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) to minify & optimize built code
- `webpack` - [Webpack bundler](https://github.com/webpack/webpack)
- `http-server` - [Command-line http server](https://github.com/indexzero/http-server)
- `material-ui` - [Material UI Next](https://material-ui-next.com) for ready-made UI components
- `prop-types` - [React Type Checker](https://github.com/facebook/prop-types)
- `react` - [React Library](https://github.com/facebook/react)
- `react-redux` - [Utility](https://github.com/reactjs/react-redux) to connect React components to the Redux store
- `redux` - [Redux State Container](https://redux.js.org/)
- `redux-actions` - [Helper](https://github.com/reduxactions/redux-actions) to create actions and reducers
- `redux-promise` - [Redux Store Middleware](https://github.com/acdlite/redux-promise) to handle promisable actions
- `redux-thunk` - [Redux Store Middleware](https://github.com/gaearon/redux-thunk) to handle async actions

