# Starter template: React + Vite + Mantine

React 19 / Redux Toolkit application bundled with Vite 5 and styled with Mantine 7 components. Mirrors the react-redux boilerplate in structure and functionality.

## Prerequisites

- Node.js >= 18

## Stack

| Tool | Purpose |
|---|---|
| React 19 | UI library |
| Redux Toolkit 2 | State management (slices, async thunks) |
| react-redux 9 | React bindings for the Redux store |
| Mantine 7 | UI component library |
| Vite 5 | Dev server and bundler |
| PostCSS | CSS processing required by Mantine |
| ESLint | JavaScript linting |

## Usage

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview production build
npm run lint     # lint src/
npm run lint:fix # auto-fix lint issues
```

## Code examples

| File | Pattern |
|---|---|
| `src/Components/Header.jsx` | Functional component, Mantine Box + Title |
| `src/Components/Main.jsx` | Functional component, useSelector, useDispatch, useEffect |
| `src/Components/Row.jsx` | Functional component, Mantine Table.Tr / Table.Td |
| `src/Components/ErrorBoundary.jsx` | Class component error boundary (getDerivedStateFromError) |
| `src/Containers/App.jsx` | Root component |
| `src/store/peopleSlice.js` | RTK slice: createSlice + createAsyncThunk |
| `src/store/index.js` | configureStore |
| `src/index.jsx` | App entry point, MantineProvider + createRoot |

## package.json dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI library |
| `@reduxjs/toolkit` | State management: configureStore, createSlice, createAsyncThunk |
| `react-redux` | React bindings for Redux |
| `@mantine/core` | UI components |
| `@mantine/hooks` | Mantine utility hooks |
| `vite` | Dev server and bundler |
| `@vitejs/plugin-react` | React JSX transform for Vite |
| `postcss-preset-mantine` | PostCSS config for Mantine CSS variables |
| `postcss-simple-vars` | PostCSS breakpoint variables |
| `eslint`, `eslint-plugin-react` | JavaScript and JSX linting |
