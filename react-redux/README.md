# Starter template: React + Redux

React 16 / Redux application using ES modules, Babel 6, Webpack 4, and Material UI v1 beta components. Demonstrates core React and Redux patterns.

## Prerequisites

- Node.js >= 10

## Stack

| Tool | Purpose |
|---|---|
| React 16 | UI library |
| Redux 4 | State container |
| react-redux | Connect React components to the Redux store |
| Material UI v1 beta | UI component library |
| Webpack 4 | Module bundler |
| Babel 6 | ES.Next transpiler |
| ESLint | JavaScript linting |

## Usage

```bash
npm install
npm run build    # bundle to build/
npm start        # serve at http://localhost:8080
npm run watch    # rebuild on file changes
npm run lint     # lint src/
npm run lint:fix # auto-fix lint issues
```

## Code examples

| File | Pattern |
|---|---|
| `src/Components/Header.jsx` | Functional component |
| `src/Components/Main.jsx` | Class component, error boundaries, lifecycle methods |
| `src/Components/Row.jsx` | Runtime prop type checking |
| `src/Containers/App.jsx` | Connect store as a decorator, map state and actions |
| `src/Actions/index.js` | Async promisable actions (redux-thunk + redux-promise) |
| `src/Reducers/index.js` | Handle async actions in reducers |
| `src/index.jsx` | Store creation with middleware and DevTools |

## package.json dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI library |
| `redux` | State container |
| `react-redux` | React bindings for Redux |
| `redux-thunk` | Middleware for async action creators |
| `redux-promise` | Middleware to handle promise-returning actions |
| `redux-actions` | Helpers to create action creators and reducers |
| `redux-devtools-extension` | Redux DevTools browser extension support |
| `material-ui` | UI components (v1.0.0-beta) |
| `prop-types` | Runtime prop type checking |
| `webpack`, `webpack-cli` | Module bundler |
| `babel-cli`, `babel-loader` | Babel 6 transpiler |
| `eslint`, `eslint-plugin-react` | JavaScript and JSX linting |
