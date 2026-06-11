# Starter template: Webpack + TypeScript + Jest

TypeScript application bundled with Webpack 5, unit-tested with Jest 29 and ts-jest, linted with ESLint 9 + @typescript-eslint.

## Prerequisites

- Node.js >= 20

## Stack

| Tool | Purpose |
|---|---|
| Webpack 5 | Module bundler |
| TypeScript 5 | Static typing, `strict: true` |
| ts-loader | TypeScript loader for Webpack |
| Jest 29 + ts-jest | Unit testing with native TypeScript support |
| ESLint 9 + @typescript-eslint | TypeScript-aware linting, flat config |
| webpack-dev-server | Dev server with HMR |
| html-webpack-plugin | HTML template with injected script tags |

## Usage

```bash
npm install
npm run dev        # dev server at http://localhost:8080 with HMR
npm run build      # production build to dist/
npm test           # run Jest tests
npm run test:watch # run tests in watch mode
npm run lint       # lint src/
```

## Project structure

```
src/
  index.ts                  entry point
  types.ts                  shared interfaces (AppEvent, ProcessedEvent, …)
  events.ts                 mock event data
  pipeline/
    index.ts                Pipeline<T> generic class (private fields)
    filter.ts               byTypes() filter transform
    format.ts               toSummary() format transform
    index.spec.ts           Pipeline unit tests
    filter.spec.ts          byTypes unit tests
    format.spec.ts          toSummary unit tests
  renderer/
    index.ts                lazy-loaded DOM renderer (separate chunk)
webpack.common.js           shared Webpack config
webpack.dev.js              dev mode + webpack-dev-server
webpack.prod.js             production mode + content-hash filenames
tsconfig.json               TypeScript config for webpack (ES2022, bundler resolution)
tsconfig.jest.json          TypeScript config override for Jest (CommonJS)
eslint.config.js            ESLint 9 flat config
```

## Demo app

The app processes a list of browser events through a two-step pipeline and renders the results as a table.

Each event has a `type`, an optional `target` (with an optional `label`), and optional `meta` (debounce or threshold). Some fields are intentionally null or incomplete to exercise optional chaining and nullish coalescing in real conditions.

The pipeline runs two transforms in sequence:

1. **filter** — `byTypes("click", "input")` drops scroll and focus events
2. **format** — `toSummary()` reads `target?.label ?? target?.id ?? "unknown"` and appends any meta info

The renderer is lazy-loaded via dynamic `import()`, arriving as a separate webpack chunk. It receives both the original event list and the processed list, then renders all six rows — grey for filtered-out events, green for those that passed. The side-by-side view makes the pipeline effect immediately visible without reading any source code.

The `Pipeline<T>` class is the structural centrepiece: a generic, immutable transform chain backed by a private field. Each call to `add()` returns `this` for chaining and replaces `#transforms` with a new array rather than mutating it.

## Two tsconfig files

`tsconfig.json` targets `"module": "ES2022"` so webpack can tree-shake ES modules. Jest needs CommonJS, so `tsconfig.jest.json` overrides `module` and `moduleResolution` for ts-jest. The jest config in `package.json` points to it explicitly.

## Polyfilling

TypeScript compiles private class fields (`#field`) natively at `"target": "ES2022"`. No Babel or polyfill step is needed for the features used in this template — all targets in the browserslist support ES2022 class syntax.

## Dependencies

| Package | Purpose |
|---|---|
| `typescript` | TypeScript compiler |
| `ts-loader` | Compile TypeScript in Webpack |
| `webpack`, `webpack-cli`, `webpack-merge` | Bundler and config composition |
| `webpack-dev-server` | Dev server with HMR |
| `html-webpack-plugin` | HTML template with injected scripts |
| `jest`, `ts-jest` | Test runner with TypeScript support |
| `@types/jest` | Type declarations for Jest |
| `eslint`, `@eslint/js` | Linter core |
| `@typescript-eslint/parser` | Parse TypeScript for ESLint |
| `@typescript-eslint/eslint-plugin` | TypeScript-specific lint rules |
