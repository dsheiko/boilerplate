# Changelog

## [Unreleased]

## [3.0.0] - 2026-06-11

### Changed
- TypeScript 5.6 → 6.0.3
- ESLint 8 → 10.4.1; migrated from `.eslintrc.js` to flat config (`eslint.config.mjs`)
- webpack-cli 5 → 7.0.3
- MUI 6 → 9.1.1
- React 19.0 → 19.2.7
- `@reduxjs/toolkit` 2.3 → 2.12.0
- `react-redux` 9.1 → 9.3.0
- `@emotion/react` and `@emotion/styled` 11.13 → 11.14
- `@types/node` 22 → 25; `@types/react` and `@types/react-dom` updated to match React 19.2
- `tsconfig.json`: target/lib raised to ES2022, added `verbatimModuleSyntax: true`
- `webpack.config.js`: added `fullySpecified: false` rule for MUI ESM compatibility

### Removed
- Redundant `import React from "react"` in all components (not needed with `react-jsx` transform)

### Added
- `import type` for type-only imports (`RootState`, `AppDispatch`, `IPerson`) per `verbatimModuleSyntax`
- `typescript-eslint` and `globals` dev dependencies for ESLint 10 flat config

## [2.0.0] - 2026-06-11

### Changed
- Migrated from Redux + redux-thunk + redux-actions to Redux Toolkit (`createSlice`, `createAsyncThunk`)
- Migrated from class components to functional components with hooks
- React 16 → 19; TypeScript 4 → 5.6; Webpack 4 → 5; MUI v1 beta → 6
- Replaced `material-ui` with `@mui/material` + `@emotion` peer dependencies
- Removed `redux-thunk`, `redux-promise`, `redux-actions`, `prop-types`
- Removed `Actions/`, `Reducers/`, `Interfaces/`, `Constants/` in favour of RTK slices

## [1.0.0] - 2017-11-21

### Added
- Initial template: React 16, Redux 3, TypeScript 4, Webpack 4, Material UI v1 beta
- `redux-thunk` + `redux-promise` async action middleware
- ESLint with `@typescript-eslint/recommended`
