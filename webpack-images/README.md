# Learning to bundle images with Webpack

Demonstrates importing images in JavaScript and optimizing them during the build with ImageMin. Bundles icons from the `ionicons` npm package.

## Prerequisites

- Node.js >= 10

## Stack

| Tool | Purpose |
|---|---|
| Webpack 3 | Module bundler |
| file-loader | Emits image files to the output directory |
| image-webpack-loader | Optimizes images with ImageMin (PNG, JPEG, GIF, SVG) |
| http-server | Local dev server |

## Usage

```bash
npm install
npm run build   # optimized images emitted to build/
npm start       # open http://localhost:8080
```

## How it works

Images required from JavaScript (e.g. `import logo from "./logo.png"`) are processed by `image-webpack-loader`, which compresses them, then by `file-loader`, which writes the result to `build/`. The import resolves to the final file path in the bundle.

Optimization settings are configured per-format in `webpack.config.js`.

## package.json dependencies

| Package | Purpose |
|---|---|
| `webpack` | Module bundler |
| `file-loader` | Copies imported assets to the output directory |
| `image-webpack-loader` | Compresses images via ImageMin |
| `clean-webpack-plugin` | Clears `build/` before each compilation |
| `http-server` | Static file server for development |
| `ionicons` | Icon set used in the demo |
