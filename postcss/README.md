# Starter template: SASS + PostCSS

SASS compilation pipeline with PostCSS Autoprefixer. Compiles `.scss` to CSS, then applies vendor prefixes based on browser targets.

## Prerequisites

- Node.js >= 10

## Stack

| Tool | Purpose |
|---|---|
| node-sass | Compiles SCSS to CSS |
| PostCSS + autoprefixer | Adds vendor prefixes for target browsers |
| nodemon | Watches `sass/` for changes in dev mode |
| http-server | Local dev server |

## Usage

```bash
npm install
npm run build   # compile sass/ -> index.css
npm start       # serve at http://localhost:8080
```

### Watch mode

```bash
npm run watch
```

Recompiles on every `.scss` change.

## Build pipeline

```
sass/index.scss
  -> node-sass -> tmp/index.css
                    -> postcss (autoprefixer) -> index.css
```

The intermediate file is written to `tmp/` in the project root.

## Project structure

```
sass/
  base/           global base styles
  component/      component-level SCSS partials
  index.scss      root import
index.html        demo page
index.css         compiled output (generated)
postcss.config.js PostCSS plugin config
```

## package.json dependencies

| Package | Purpose |
|---|---|
| `node-sass` | Compile SCSS to CSS |
| `postcss-cli` | Run PostCSS transforms from the command line |
| `autoprefixer` | PostCSS plugin that adds vendor prefixes |
| `nodemon` | Watch files and re-run commands on change |
| `http-server` | Static file server for development |
