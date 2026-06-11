# Starter template: Karma + Jasmine

JavaScript unit testing with Jasmine running in headless Chrome via Karma. Source is bundled with Webpack before tests run.

## Prerequisites

- Node.js >= 10
- Google Chrome installed (used by `karma-chrome-launcher`)

## Stack

| Tool | Purpose |
|---|---|
| Webpack 3 | Bundles source and test files |
| Babel 6 | Transpiles ES.Next syntax |
| Jasmine | Test framework (describe/it/expect) |
| Karma | Test runner, launches headless Chrome |
| karma-spec-reporter | Detailed console output per spec |

## Usage

```bash
npm install
npm run build   # bundle src/ with webpack.dev.js
npm test        # compile tests and run in headless Chrome
```

## How it works

1. `npm run build` bundles `src/` using `webpack.dev.js`
2. `npm test` runs two steps:
   - Webpack compiles test files using `tests/webpack.test.js`
   - Karma launches headless Chrome, executes the bundle, and prints results via `karma-spec-reporter`

## package.json dependencies

| Package | Purpose |
|---|---|
| `karma` | Test runner |
| `karma-chrome-launcher` | Run tests in headless Chrome |
| `karma-jasmine` | Jasmine adapter for Karma |
| `karma-spec-reporter` | Detailed per-spec console output |
| `jasmine-core` | Jasmine test framework |
| `babel-loader` | Transpile JS files in Webpack |
| `babel-preset-env` | Transpile to target browser range |
| `webpack` | Bundle source and test modules |
| `webpack-merge` | Merge webpack config objects |
