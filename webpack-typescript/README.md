# Starter template: Webpack + TypeScript + Jest

TypeScript application bundled with Webpack 5, unit-tested with Jest 29 and ts-jest, linted with ESLint + @typescript-eslint.

## Prerequisites

- Node.js >= 16

## Stack

| Tool | Purpose |
|---|---|
| Webpack 5 | Module bundler |
| TypeScript 5 | Static typing and compilation |
| ts-loader | TypeScript loader for Webpack |
| Jest 29 + ts-jest | Unit testing with native TypeScript support |
| ESLint + @typescript-eslint | TypeScript-aware linting |
| http-server | Local dev server |

## Usage

```bash
npm install
npm run build      # compile TypeScript and bundle to build/
npm test           # run Jest tests
npm run test:watch # run tests in watch mode
npm run lint       # lint src/ with ESLint
npm start          # serve at http://localhost:8080
```

## Project structure

```
src/
  index.ts               entry point
  util/
    foo.ts               utility module
    foo.spec.ts          unit tests
  console-log-html.d.ts  type declarations for console-log-html
webpack.config.js        Webpack configuration
tsconfig.json            TypeScript compiler options
.eslintrc.js             ESLint rules
```

## Configuration

- `tsconfig.json` - TypeScript compiler options (`target: es2017`, `noImplicitAny: true`)
- `.eslintrc.js` - ESLint rules using `@typescript-eslint/recommended` + custom rules (double quotes, semicolons)
- `webpack.config.js` - Webpack 5 with `ts-loader`, source maps, `output.clean: true`

## package.json dependencies

| Package | Purpose |
|---|---|
| `typescript` | TypeScript compiler |
| `ts-loader` | Compile TypeScript in Webpack |
| `webpack`, `webpack-cli` | Module bundler |
| `jest`, `ts-jest` | Test runner with TypeScript support |
| `@types/jest` | Type declarations for Jest |
| `eslint` | Linter |
| `@typescript-eslint/parser` | Parse TypeScript for ESLint |
| `@typescript-eslint/eslint-plugin` | TypeScript-specific lint rules |
| `http-server` | Static file server for development |
