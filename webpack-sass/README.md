# Learning to bundle SASS with Webpack

Demonstrates importing SCSS from JavaScript and bundling styles into the page at runtime. Uses the `ionicons` npm package to show how npm-installed fonts and icons are resolved through the SASS pipeline.

## Prerequisites

- Node.js >= 10

## Stack

| Tool | Purpose |
|---|---|
| Webpack 3 | Module bundler |
| sass-loader | Compiles SCSS to CSS |
| css-loader | Resolves CSS `@import` and `url()` |
| style-loader | Injects CSS into the DOM at runtime |
| url-loader | Inlines small fonts/images as base64 data URIs |
| http-server | Local dev server |

## Usage

```bash
npm install
npm run build   # bundle JS + styles to build/
npm start       # open http://localhost:8080
```

## How it works

`src/index.js` imports a SCSS file. Webpack processes it through the loader chain:

```
.scss -> sass-loader -> css-loader -> style-loader -> bundle.js
```

`style-loader` injects `<style>` tags into the page when the bundle runs. Fonts and icons imported inside SCSS are handled by `url-loader`: files under 10 kB are inlined as data URIs, larger ones are emitted as separate files.

## package.json dependencies

| Package | Purpose |
|---|---|
| `webpack` | Module bundler |
| `sass-loader` | Compile SCSS |
| `css-loader` | Resolve CSS imports and url() references |
| `style-loader` | Inject compiled CSS into the DOM |
| `url-loader` | Inline or emit font/image assets |
| `clean-webpack-plugin` | Clear `build/` before each compilation |
| `http-server` | Static file server for development |
| `ionicons` | Icon font imported from npm |
