# Starter template: React + Redux + TypeScript

React 16 / Redux application using TypeScript 4, Webpack 4, and Material UI v1 beta components. Demonstrates core React and Redux patterns with static typing.

## Prerequisites

- Node.js >= 14

## Stack

| Tool | Purpose |
|---|---|
| React 16 | UI library |
| Redux 3 | State container |
| react-redux | Connect React components to the Redux store |
| Material UI v1 beta | UI component library |
| TypeScript 4 | Static typing |
| Webpack 4 | Module bundler |
| ts-loader | TypeScript loader for Webpack |
| ESLint + @typescript-eslint | TypeScript-aware linting |

## Usage

```bash
npm install
npm run build    # compile TypeScript and bundle to build/
npm start        # serve at http://localhost:8080
npm run watch    # rebuild on file changes
npm run lint     # lint src/ with ESLint
```

## Code examples

| File | Pattern |
|---|---|
| `src/Components/Header.tsx` | Functional component with typed props |
| `src/Components/Main.tsx` | Class component with typed state and lifecycle |
| `src/Components/Row.tsx` | Typed prop interfaces |
| `src/Containers/App.tsx` | Connect store as a decorator, typed dispatch |
| `src/Actions/index.ts` | Typed async actions (redux-thunk + redux-promise) |
| `src/Reducers/index.ts` | Typed reducers |
| `src/Interfaces/index.ts` | Shared TypeScript interfaces |
| `src/Constants/index.ts` | Action type constants |

## Configuration

- `tsconfig.json` - TypeScript options (`target: es6`, `noImplicitAny: true`, `skipLibCheck: true`)
- `.eslintrc.js` - ESLint with `@typescript-eslint/recommended`
- `webpack.config.js` - Webpack 4 with `ts-loader`

## package.json dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI library |
| `redux` | State container |
| `react-redux` | React bindings for Redux |
| `redux-thunk` | Middleware for async action creators |
| `redux-promise` | Middleware to handle promise-returning actions |
| `redux-actions` | Helpers for action creators and reducers |
| `material-ui` | UI components (v1.0.0-beta) |
| `prop-types` | Runtime prop type checking |
| `typescript` | TypeScript 4 compiler |
| `ts-loader` | Compile TypeScript in Webpack |
| `webpack`, `webpack-cli` | Module bundler |
| `eslint`, `@typescript-eslint/*` | TypeScript-aware linting |
