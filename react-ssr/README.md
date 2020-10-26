# Starter template for Server-Side Rendering in React

- See also [Demystifying server-side rendering in React](https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4)

## Set up
1) Clone this repo
2) Create `.env` in the project directory
```
DEMO_NODE_SERVER_HOST=127.0.0.1
DEMO_NODE_SERVER_PORT=9100
DEMO_DB_USER="username"
DEMO_DB_PASS="userpassword"
DEMO_DB_HOST="localhost"
DEMO_DB_NAME="react_antd"
```
3) Create DB as given in `.env` ( e.g. `react_antd` )
4) Initialize, migrate, build and start
```
npm i
npm run migrate:up
npm run build
npm start
```

## Available Automation Commands
- `npm run build` - build app
- `npm run watch` - watch for updates in the code base
- `npm start` - start app
- `npm run migrate:up` - run all available migrations up to the latest one
- `npm run migrate:down` - rollback migration


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

- `webpack` - [Webpack bundler](https://github.com/webpack/webpack)
  - `clean-webpack-plugin` - [Webpack plugin](https://github.com/johnagan/clean-webpack-plugin) to clean up build directory before compilation
  - `uglifyjs-webpack-plugin` - [Webpack plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/) to minify & optimize built code
  - `css-loader` - [Webpack loader](https://www.npmjs.com/package/css-loader) to load CSS
  - `sass-loader`- [Webpack loader](https://www.npmjs.com/package/sass-loader) to load SASS
  - `mini-css-extract-plugin` - [Webpack plugin](https://www.npmjs.com/package/mini-css-extract-plugin) to minify & optimize CSS
  - `node-sass` - [node-sass](https://www.npmjs.com/package/node-sass) to compile SASS into CSS
  - `dotenv-webpack` - [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack)  to read env variables from .env when none in process.env available
  - [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals) - ignore node-modules during Webpack build (https://github.com/webpack/webpack/issues/1576)

- `react` - [React Library](https://github.com/facebook/react)
  - `react-redux` - [Utility](https://github.com/reactjs/react-redux) to connect React components to the Redux store
  - `redux` - [Redux State Container](https://redux.js.org/)
  - `redux-actions` - [Helper](https://github.com/reduxactions/redux-actions) to create actions and reducers
  - `redux-promise` - [Redux Store Middleware](https://github.com/acdlite/redux-promise) to handle promisable actions
  - `redux-thunk` - [Redux Store Middleware](https://github.com/gaearon/redux-thunk) to handle async actions
  - `redux-devtools-extension` - [Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension)
  - `prop-types` - [React Type Checker](https://github.com/facebook/prop-types)
  - `immutability-helper` - [Immutability-helper](https://www.npmjs.com/package/immutability-helper) to mutate a copy of data without changing the original source
  - `react-router/react-router-dom` - [React Router](https://reacttraining.com/)
  - `connected-react-router/history` - [Redux connector for React Router](https://www.npmjs.com/package/connected-react-router)

- `express` - [Express.js, web framework for Node.js](https://expressjs.com/)
  - `body-parser` - [Node.js body parsing middleware](https://www.npmjs.com/package/body-parser)
  - `minimist` - [parse argument options](https://www.npmjs.com/package/minimist)
  - `debug` - [debugging utility](https://www.npmjs.com/package/debug)
  - `mysql` - [mysql](https://www.npmjs.com/package/mysql) - to access MySQL in Node.js
  - `db-migrate/db-migrate-mysql` - [db-migrate](https://www.npmjs.com/package/db-migrate) to manage DB migrations in Node.js

- `antd` - [Ant.Design](https://ant.design/docs/react/introduce) design system and React component library
- `axios` - [axios](https://www.npmjs.com/package/axios) Promise based HTTP client for the browser and node.js


# A Process Control System

- http://www.supervisord.org/running.html
- https://www.digitalocean.com/community/tutorials/how-to-install-and-manage-supervisor-on-ubuntu-and-debian-vps