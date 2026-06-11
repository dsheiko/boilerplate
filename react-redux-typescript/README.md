# Starter template: React + Redux + TypeScript

React 19 + Redux Toolkit application using TypeScript 6, Webpack 5, and MUI 9. Demonstrates async data fetching with RTK, typed Redux store, and functional components with hooks.

## Prerequisites

- Node.js >= 18

## Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| Redux Toolkit 2 | State management (slices, async thunks) |
| react-redux 9 | Connect React components to the Redux store |
| MUI 9 | UI component library |
| TypeScript 6 | Static typing |
| Webpack 5 | Module bundler |
| ts-loader | TypeScript loader for Webpack |
| ESLint 10 + typescript-eslint | TypeScript-aware linting (flat config) |

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
| `src/store/peopleSlice.ts` | RTK slice with `createAsyncThunk` for data fetching |
| `src/store/index.ts` | Typed `RootState` and `AppDispatch` exports |
| `src/Components/Main.tsx` | `useSelector` / `useDispatch` with typed store |
| `src/Components/Row.tsx` | Typed prop interface, `import type` for type-only imports |
| `src/Containers/App.tsx` | Root container component |
| `src/index.tsx` | App entry point with Redux `Provider` |

## Configuration

| File | Purpose |
|---|---|
| `tsconfig.json` | `target: ES2022`, `strict: true`, `verbatimModuleSyntax: true`, `moduleResolution: bundler` |
| `eslint.config.mjs` | ESLint 10 flat config with `typescript-eslint` recommended rules |
| `webpack.config.js` | Webpack 5 with `ts-loader`; `fullySpecified: false` for MUI ESM compatibility |

## Dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI library |
| `@reduxjs/toolkit` | Redux slice and async thunk utilities |
| `react-redux` | React bindings for Redux |
| `@mui/material` | UI components |
| `@emotion/react`, `@emotion/styled` | CSS-in-JS engine required by MUI |
| `typescript` | TypeScript 6 compiler |
| `ts-loader` | Compile TypeScript in Webpack |
| `webpack`, `webpack-cli` | Module bundler |
| `eslint`, `typescript-eslint` | TypeScript-aware linting |
