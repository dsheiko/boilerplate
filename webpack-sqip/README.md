# Learning to bundle SQIP with Webpack

Demonstrates three image placeholder techniques for lazy-loaded images using Webpack loaders. Each build mode produces a different placeholder style displayed while the full image loads.

Reference: [How to use SVG as a Placeholder, and Other Image Loading Techniques](https://www.freecodecamp.org/news/using-svg-as-placeholders-more-image-loading-techniques-bed1b810ab2c/)

## Prerequisites

- Node.js >= 10

## Stack

| Tool | Purpose |
|---|---|
| Webpack 4 | Module bundler |
| Babel 7 + React 16 | Component rendering |
| sqip-loader | Generates blurred SVG primitives as placeholders |
| image-trace-loader | Generates SVG silhouette (outline) placeholders |
| image-webpack-loader | Optimizes images with ImageMin |
| lazysizes | Lazy-loads images using IntersectionObserver |

## Build modes

Each mode produces a different placeholder approach:

| Command | Placeholder type |
|---|---|
| `npm run build:primitive` | Geometric SVG primitives (triangle/square shapes) |
| `npm run build:trace` | SVG silhouette of the image outline |
| `npm run build:sqip` | Blurred SVG mosaic (SQIP technique) |

```bash
npm install
npm run build:primitive   # or build:trace or build:sqip
npm start                 # open http://localhost:8080
```

## How it works

Each build uses a different Webpack config (`webpack.primitive.js`, `webpack.trace.js`, `webpack.sqip.js`). The chosen loader generates an inline SVG data URI from the source image. This URI is rendered as a placeholder `<img>` tag while the full image loads via `lazysizes`.

The placeholder is replaced by the real image once it enters the viewport, giving a smooth progressive loading experience with no layout shift.

## package.json dependencies

| Package | Purpose |
|---|---|
| `sqip-loader` | Generate blurred SVG primitives |
| `image-trace-loader` | Generate SVG silhouettes |
| `image-webpack-loader` | Optimize images at build time |
| `file-loader` | Emit image files to the output directory |
| `url-loader` | Inline small assets as data URIs |
| `lazysizes` | Lazy-load images in the browser |
| `webpack` | Module bundler |
| `babel-loader` | Transpile React JSX |
