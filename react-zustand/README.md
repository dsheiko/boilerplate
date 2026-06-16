# Starter template: React + Redux

React 19 / Redux Toolkit application using ES modules, Babel 7, Webpack 5, and MUI v6 components. Demonstrates core React and Redux patterns.

## Prerequisites

- Node.js >= 18

## Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| Redux Toolkit 2 | State management (slices, async thunks) |
| react-redux 9 | React bindings for the Redux store |
| MUI v6 | UI component library |
| Webpack 5 | Module bundler |
| Babel 7 | ES.Next transpiler |
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
| `src/Components/Header.jsx` | Functional component, MUI AppBar |
| `src/Components/Main.jsx` | Functional component, useSelector, useDispatch, useEffect |
| `src/Components/Row.jsx` | Functional component, MUI TableRow |
| `src/Components/ErrorBoundary.jsx` | Class component error boundary (getDerivedStateFromError) |
| `src/Containers/App.jsx` | Root component, Provider entry point |
| `src/store/peopleSlice.js` | RTK slice: createSlice + createAsyncThunk |
| `src/store/index.js` | configureStore |
| `src/index.jsx` | App entry point, createRoot |

## package.json dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI library |
| `@reduxjs/toolkit` | State management: configureStore, createSlice, createAsyncThunk |
| `react-redux` | React bindings for Redux |
| `@mui/material` | UI components |
| `@emotion/react`, `@emotion/styled` | CSS-in-JS engine required by MUI |
| `webpack`, `webpack-cli` | Module bundler |
| `@babel/core`, `babel-loader` | Babel 7 transpiler |
| `@babel/preset-env` | Modern JS transpilation |
| `@babel/preset-react` | JSX transpilation |
| `eslint`, `eslint-plugin-react` | JavaScript and JSX linting |
