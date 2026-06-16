# SolidJS + Store Boilerplate

SolidJS application with reactive global state via `createStore`. Renders a Star Wars characters table fetched from a local JSON fixture.

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
| [SolidJS](https://www.solidjs.com/) | 1.9 | UI framework |
| [@suid/material](https://suid.io/) | 0.17 | MUI components for SolidJS |
| [Vite](https://vitejs.dev/) | 5.4 | Build tool and dev server |
| [vite-plugin-solid](https://github.com/solidjs/vite-plugin-solid) | 2.10 | SolidJS JSX transform |

## State Management

SolidJS provides reactive primitives out of the box — no external library needed.

`createStore` creates a deeply reactive store. Updates are done by path using `setState`:

```js
// src/store/index.js
import { createStore } from "solid-js/store";

const [state, setState] = createStore({ people: [] });

export async function fetchPeople() {
  const response = await fetch( "/people.json" );
  const data = await response.json();
  setState( "people", data.results );
}

export { state };
```

Components import `state` directly and read it reactively. No `Provider`, no `useSelector`, no `useDispatch`.

## Key SolidJS Differences vs React

| React + Redux | SolidJS |
|---|---|
| `useEffect` | `onMount` |
| `useSelector` | Direct store import |
| `useDispatch` + action | Exported async function |
| `array.map()` in JSX | `<For each={...}>` |
| `createRoot` | `render` from `solid-js/web` |
| `Provider` wrapper | None needed |

## Component Example

```jsx
import { onMount, For } from "solid-js";
import { state, fetchPeople } from "src/store";

export default function Main() {
  onMount( () => {
    fetchPeople();
  } );

  return (
    <For each={ state.people }>
      { ( person ) => <Row person={ person } /> }
    </For>
  );
}
```

SolidJS tracks fine-grained reactivity at the signal/store level. `<For>` efficiently patches the DOM when the list changes rather than re-rendering.
