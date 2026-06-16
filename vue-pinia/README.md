# Vue + Pinia Boilerplate

Webpack-based boilerplate for Vue 3 + Pinia. Mirrors the react-redux boilerplate in structure and functionality: fetches Star Wars characters from a local JSON file and renders them in a Vuetify table.

## Stack

- [Vue 3](https://vuejs.org/) with Composition API (`<script setup>`)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Vuetify 3](https://vuetifyjs.com/) for UI components (Material Design)
- [Webpack 5](https://webpack.js.org/) with `vue-loader`

## Structure

```
src/
  main.js              # app entry, mounts Vue + Pinia + Vuetify
  App.vue              # root component
  components/
    Header.vue         # app bar
    Main.vue           # table with data fetch on mount
    Row.vue            # single table row
    ErrorHandler.vue   # error boundary via errorCaptured hook
  store/
    peopleStore.js     # Pinia store with fetchPeople action
```

## Usage

```bash
npm install
npm run build    # one-off build
npm run watch    # rebuild on change
npm start        # serve at http://localhost:8080
```
