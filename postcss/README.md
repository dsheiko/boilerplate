# Starter template for SASS + PostCSS( Autoprefix )

The bundle contains sample application, made of AMD (RequireJS) modules in ES.Next syntax.
The application uses Babel to transpile ES.Next syntax to JavaScript supported by user agents as specified in the configuration (see `.babelrc`)

## Available Automation Commands
- `npm run build` - build app
- `npm run watch` - watch for updates in the code base
- `npm start` - start app

## package.json

- `node-sass` - [SASS compiler](https://github.com/sass/node-sass)
- `postcss-cli` - [PostCSS processor](https://babeljs.io/docs/usage/cli/) to transform CSS
- `autoprefixer` - [PostCSS plugin](https://github.com/postcss/autoprefixer) to extend CSS prefixes according to browser target group (see [postcss.config](./postcss.config))
- `nodemon` - [Monitor](https://github.com/remy/nodemon) to build sources automatically as they change
- `http-server` - [Command-line http server](https://github.com/indexzero/http-server)
