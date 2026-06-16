# Svelte + Store Boilerplate

Svelte 5 application with reactive global state via `svelte/store`. Renders a Star Wars characters table fetched from a local JSON fixture.

## Prerequisites

- Node.js >= 18

## Usage

```bash
npm install
npm start       # dev server at http://localhost:5173
npm run build   # production build → build/
npm run preview # preview production build
npm run lint    # lint src/
npm run lint:fix
```

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Svelte](https://svelte.dev/) | 5 | UI framework (compiler) |
| [Vite](https://vitejs.dev/) | 5.4 | Build tool and dev server |
| [@sveltejs/vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) | 4 | Svelte compiler integration |

## State Management

`svelte/store` provides reactive stores that work across the component tree with no Provider wrapper.

```js
// src/store/index.js
import { writable } from "svelte/store";

export const people = writable( [] );

export async function fetchPeople() {
  const response = await fetch( "/people.json" );
  const data = await response.json();
  people.set( data.results );
}
```

In any `.svelte` file, prefix the store name with `$` to auto-subscribe and get the current value. Svelte handles subscription and cleanup automatically.

## Key Svelte Differences vs React + Redux

| React + Redux | Svelte |
|---|---|
| `useEffect` | `onMount` |
| `useSelector` | `$storeName` (auto-subscribe) |
| `useDispatch` + action | Exported async function |
| `array.map()` in JSX | `{#each}` block |
| `createRoot` + `render` | `mount` from `svelte` |
| `Provider` wrapper | None needed |
| `.jsx` files | `.svelte` files |
| CSS-in-JS (Emotion) | Scoped `<style>` blocks |

## Component Example

```svelte
<script>
  import { onMount } from "svelte";
  import { people, fetchPeople } from "../store/index.js";

  onMount( () => {
    fetchPeople();
  } );
</script>

{#each $people as person (person.name)}
  <Row {person} />
{/each}
```

Svelte compiles components to vanilla JS at build time — there is no virtual DOM and no runtime framework overhead in production.

## Svelte 5 Notes

- Component props use the `$props()` rune: `let { person } = $props();`
- App is mounted with `mount()` from `svelte` (replaces `new App({ target })` from Svelte 4)
- `svelte/store` writables work unchanged from Svelte 4
