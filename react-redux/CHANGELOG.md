# Changelog

## 0.0.2 (2026-06-11)

### Changed

- React 16 upgraded to React 19; `ReactDOM.render` replaced with `createRoot`
- Redux 4 + redux-actions + redux-thunk + redux-promise + redux-devtools-extension replaced with Redux Toolkit 2 (`configureStore`, `createSlice`, `createAsyncThunk`)
- react-redux upgraded from 5 to 9; class components with `connect()` replaced with `useSelector` / `useDispatch` hooks
- `material-ui` v1 beta replaced with `@mui/material` v6 (MUI) + `@emotion/react` + `@emotion/styled`
- Babel 6 stack (`babel-cli`, `babel-preset-env`, `babel-preset-react`, etc.) replaced with Babel 7 (`@babel/core`, `@babel/preset-env`, `@babel/preset-react`)
- Webpack 4 upgraded to Webpack 5; `clean-webpack-plugin` and `uglifyjs-webpack-plugin` removed (built-in equivalents used)
- `prop-types` removed
- All class components converted to functional components
- `ErrorBoundary` updated to use `getDerivedStateFromError`
- `src/Actions/`, `src/Constants/`, `src/Reducers/` replaced by `src/store/` (RTK slice pattern)

## 0.0.1

Initial release.
