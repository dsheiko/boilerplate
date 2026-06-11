# Starter template: Webpack + Babel

ES modules application bundled with Webpack and transpiled by Babel 7. Shows static and dynamic imports, module resolution by path and name, and a dual-bundle strategy for modern vs. legacy browsers.

## Prerequisites

- Node.js >= 10

## Stack

| Tool | Purpose |
|---|---|
| Webpack 4 | Module bundler |
| Babel 7 | ES.Next transpiler |
| @babel/preset-env | Target browser range for transpilation |
| terser-webpack-plugin | Minify production bundles |
| ESLint | JavaScript linting |
| http-server | Local dev server |

## Usage

```bash
npm install
npm run build:dev    # development build
npm run build:prod   # production build (modern + legacy bundles)
npm run watch        # watch mode (dev config)
npm start            # serve at http://localhost:8080
npm run lint         # lint src/
npm run lint:fix     # auto-fix lint issues
```

## Dual-bundle strategy

Production builds generate two bundles:

- `build/index.js` - targets modern browsers, minimal transpilation and polyfills
- `build/legacy/index.js` - targets legacy browsers, full polyfill set

`index.html` uses `type="module"` / `nomodule` to load the appropriate bundle automatically:

```html
<script type="module" src="./build/index.js"></script>
<script nomodule src="./build/legacy/index.js"></script>
```

Modern browsers load the lighter module bundle; legacy browsers load the polyfilled one.

## Webpack configuration files

| File | Purpose |
|---|---|
| `webpack.common.js` | Shared base configuration |
| `webpack.dev.js` | Dev build (extends common, targets modern browsers) |
| `webpack.prod.js` | Production build for modern browsers (extends dev, adds minification) |
| `webpack.prod-legacy.js` | Production build for legacy browsers (extends dev, adds full polyfills) |

## package.json dependencies

| Package | Purpose |
|---|---|
| `@babel/core`, `@babel/cli` | Babel 7 core and CLI |
| `babel-loader` | Babel loader for Webpack |
| `@babel/preset-env` | Transpile to target browser range |
| `@babel/plugin-transform-runtime` | Inject runtime polyfills |
| `@babel/plugin-syntax-dynamic-import` | Enable `import()` lazy loading |
| `terser-webpack-plugin` | Minify and optimize production output |
| `eslint`, `eslint-plugin-import` | JavaScript linting |
| `webpack`, `webpack-cli`, `webpack-merge` | Bundler and config merging |
| `http-server` | Static file server for development |
