# vue-nuxt

A demo app built with [Nuxt 3](https://nuxt.com), [Ant Design Vue v4](https://antdv.com), and [Vue Query v5](https://tanstack.com/query/latest/docs/vue/overview). It mirrors the structure and features of the `react-nextjs` boilerplate.

## Stack

- **Nuxt 3** — file-based routing, server routes (Nitro), SSR
- **Ant Design Vue v4** — UI components (Table, Form, Modal, Layout)
- **@tanstack/vue-query v5** — server-state management with SSR hydration
- **MySQL 2** — database via `mysql2/promise`
- **db-migrate** — schema migrations
- **TypeScript 5** — strict mode throughout
- **SCSS** — global styles in `assets/styles/main.scss`

## Project structure

```
vue-nuxt/
├── server/
│   ├── api/v1/projects/        # Nitro API routes (GET, POST, PUT, DELETE)
│   └── utils/
│       ├── config.ts           # MySQL connection config from ENV
│       ├── utils.ts            # removeNullProps helper
│       └── model/
│           ├── db.ts           # MySQL connection singleton
│           ├── AbstractModel.ts # Base class: CRUD, pagination, filtering
│           ├── Project.ts      # ProjectModel extending AbstractModel
│           └── index.ts        # Connects DB, exports projectModel
├── utils/
│   ├── type.ts                 # Shared TypeScript types
│   ├── constants.ts            # PAGE_PROJECTS constant
│   └── api.ts                  # Fetch helpers (getList, get, add, update, remove)
├── components/
│   ├── AppNavbar.vue           # Header
│   ├── AppSidebar.vue          # Left sidebar
│   ├── UiTable.vue             # Generic paginated/sortable table
│   ├── ProjectTable.vue        # Projects table with edit/delete actions
│   └── EditForm.vue            # Create/edit form in a modal
├── layouts/
│   └── default.vue             # Root layout: Navbar + Sidebar + content slot
├── pages/
│   ├── index.vue               # Redirects to /projects
│   └── projects/
│       ├── index.vue           # Projects list
│       └── [id].vue            # Edit modal (id=0 for new records)
├── plugins/
│   ├── ant-design-vue.ts       # Registers Ant Design Vue globally
│   └── vue-query.ts            # Vue Query setup with SSR dehydration/hydration
└── assets/styles/
    └── main.scss               # Global styles
```

## Initial set up

Install dependencies:
```bash
npm install
```

Create `.env`:
```bash
cp .env.dist .env
```
Update credentials in `.env` to match your MySQL setup.

Create database:
```sql
CREATE DATABASE vue_nuxt;
```

Run migrations:
```bash
npm run migrate:up
```

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root redirects to `/projects`.

## API routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/projects` | List with pagination and sorting |
| POST | `/api/v1/projects` | Create record |
| GET | `/api/v1/projects/:id` | Get single record |
| PUT | `/api/v1/projects/:id` | Update record |
| DELETE | `/api/v1/projects/:id` | Delete record |

Query params for GET list: `current`, `pageSize`, `sortField`, `sortOrder`.

## Notes

- The modal route pattern (`/projects/[id]`) renders the table plus an overlay modal, the same way the Next.js version does with parallel routes.
- Vue Query state is dehydrated on the server and hydrated on the client via the `plugins/vue-query.ts` plugin.
- The DB connection is a lazy singleton: it connects on first use and is reused across requests.
