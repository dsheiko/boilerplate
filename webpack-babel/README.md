# Starter template: Webpack + Babel

ES modules application bundled with Webpack 5 and transpiled by Babel 7. Shows static and dynamic imports, module resolution by path and name, automatic polyfilling via core-js, and HMR in development.

## Prerequisites

- Node.js >= 20

## Stack

| Tool | Purpose |
|---|---|
| Webpack 5 | Module bundler |
| Babel 7 | ES.Next transpiler |
| @babel/preset-env | Target browser range, auto-selects transforms |
| core-js 3 | Polyfills injected per usage |
| @babel/plugin-transform-runtime | Deduplicates Babel helpers |
| html-webpack-plugin | Generates HTML with injected script tags |
| webpack-dev-server | Dev server with HMR |
| ESLint 9 | JavaScript linting (flat config) |

## Usage

```bash
npm install
npm run dev      # dev server at http://localhost:8080 with HMR
npm run build    # production build to dist/
npm run lint     # lint src/
npm run lint:fix # auto-fix lint issues
```

## Demo app

The app processes a list of browser events through a two-step pipeline and renders the results as a table.

Each event has a `type`, an optional `target` (with an optional `label`), and optional `meta` (debounce or threshold). Some fields are intentionally null or incomplete to exercise optional chaining and nullish coalescing in real conditions.

The pipeline runs two transforms in sequence:

1. **filter** — `byTypes("click", "input")` drops scroll and focus events
2. **format** — `toSummary()` reads `target?.label ?? target?.id ?? "unknown"` and appends any meta info

The renderer is lazy-loaded via dynamic `import()`, arriving as a separate webpack chunk. It receives both the original event list and the processed list, then renders all six rows — grey for filtered-out events, green for those that passed. The side-by-side view makes the pipeline effect immediately visible without reading any source code.

The `Pipeline` class is the structural centrepiece: an immutable transform chain backed by a private field (`#transforms`). Each call to `add()` returns `this` for chaining and replaces `#transforms` with a new array rather than mutating it. Private class fields, optional chaining, nullish coalescing, and object spread are all syntax that Babel must transform for the configured browser targets — making the class a direct demonstration of what the toolchain does.

## Configuration files

| File | Purpose |
|---|---|
| `webpack.common.js` | Shared base: entry, output, babel-loader, HtmlWebpackPlugin |
| `webpack.dev.js` | Dev mode, eval-source-map, webpack-dev-server |
| `webpack.prod.js` | Production mode, source-map, content-hash filenames |
| `babel.config.json` | Babel preset and plugins, read by both webpack and ESLint |
| `eslint.config.js` | ESLint 9 flat config |

## Output

- Dev: served in memory by webpack-dev-server
- Prod: `dist/index.[contenthash].js` plus any lazy chunks

Content hashes ensure proper cache invalidation without a separate cache-busting step.

## Polyfilling

`useBuiltIns: "usage"` in `babel.config.json` means Babel scans each file and injects only the core-js polyfills actually used. No manual `import "core-js"` needed. Browser targets come from the `browserslist` field in `package.json`.

## Module resolution

Webpack is configured to resolve modules from both `node_modules` and `src/`, so bare imports like `import { utilBar } from "util/bar"` resolve to `src/util/bar.js`.

## Dependencies

| Package | Purpose |
|---|---|
| `@babel/core`, `@babel/preset-env` | Babel core and env preset |
| `@babel/plugin-transform-runtime` | Helper deduplication |
| `@babel/eslint-parser` | Babel-aware parser for ESLint |
| `babel-loader` | Webpack loader for Babel |
| `core-js` | Polyfill library (usage-based injection) |
| `html-webpack-plugin` | HTML template with auto-injected scripts |
| `webpack-dev-server` | Dev server with HMR |
| `webpack-merge` | Config composition (common + dev/prod) |
| `eslint`, `@eslint/js`, `eslint-plugin-import` | Linting |
