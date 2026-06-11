# Starter template: RequireJS + Babel

AMD module bundling with RequireJS and ES.Next syntax transpiled by Babel. SASS sources compile to CSS with Autoprefixer.

## Prerequisites

- Node.js >= 14

## Stack

| Tool | Purpose |
|---|---|
| RequireJS | AMD module loader in the browser |
| Babel 6 | Transpiles ES.Next and emits AMD module format |
| SASS | CSS preprocessor |
| http-server | Local dev server |

## Usage

```bash
npm install
npm run build   # transpile src/ to build/
npm start       # open http://localhost:8080
```

## How it works

Babel transpiles each file in `src/` to AMD format in `build/`. RequireJS loads them at runtime using `data-main` on the `<script>` tag in `index.html`. SASS compiles to `index.css`.

The `.babelrc` targets browsers with >2% market share and the last 2 versions. Polyfills are injected via `babel-plugin-transform-runtime`.

## package.json dependencies

| Package | Purpose |
|---|---|
| `babel-cli` | Babel 6 CLI (`babel src -d build`) |
| `babel-preset-env` | Transpile to target browser range |
| `babel-plugin-transform-es2015-modules-amd` | Emit AMD module format |
| `babel-plugin-transform-runtime` | Inject polyfills from `babel-runtime` |
| `http-server` | Serve static files locally |
| `babel-polyfill` | Full ES6+ polyfill for the runtime |
