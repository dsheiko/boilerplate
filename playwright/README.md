# Starter template: E2E testing with Playwright

End-to-end browser tests using Playwright. Demonstrates page object model, fixtures, RWD viewport testing, screenshots, and form interaction.

> To better understand the test structure and how Playwright test fixtures are used in this project, see: [Optimizing End-to-End Testing with Playwright: A Practical Guide](https://dsheiko.com/weblog/optimizing-end-to-end-testing-with-playwright/)

## Prerequisites

- Node.js >= 18
- Run `npx playwright install` after `npm install` to download browser binaries

## Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation and test runner |
| ESLint | Linting with custom spacing and block rules |

## Usage

```bash
npm install
npx playwright install

npm test                # run against the configured URL
npm run test:dev        # run against http://localhost:3000
npm run test:debug      # run headed with debugger
npm run test:ui         # open Playwright UI mode
```

## Configuring the target URL

Set `BASE_URL` in the script or via environment variable:

```json
"test": "BASE_URL=https://example.com playwright test --reporter=list"
```

Or pass it inline:

```bash
BASE_URL=https://example.com npm test
```

## Structure

```
playwright/
├── playwright.config.js         # Playwright configuration
├── eslint.config.mjs            # ESLint with custom rules
├── .eslint-rules/               # Custom ESLint rule implementations
├── tests/
│   ├── base/
│   │   ├── AbstractPage.js      # Base class for all page objects
│   │   ├── fixtures.js          # Playwright test fixtures
│   │   └── HomePage.js          # Example page object
│   ├── include/
│   │   ├── constants.js         # Viewports, saveAs, utility helpers
│   │   └── helpers.js           # uniqid and other utilities
│   └── home.spec.js             # Example tests
└── test-results/                # Screenshots (gitignored)
```

## Writing page objects

Extend `AbstractPage` and define locators in the constructor:

```js
import { AbstractPage } from "./AbstractPage.js";

export default class ArticlePage extends AbstractPage {
    baseUrl = "/articles";

    constructor( page ) {
        super( page );
        this.titleLoc = page.locator( "h1.article-title" );
        this.bodyLoc = page.locator( ".article-body" );
    }
}
```

Register it as a fixture in `tests/base/fixtures.js`:

```js
articlePage: async ( { page }, use ) => {
    const model = new ArticlePage( page );
    await use( model );
},
```

## Writing tests

Import from `fixtures.js` instead of directly from `@playwright/test`:

```js
import { test, expect } from "./base/fixtures.js";
import { VIEWPORTS } from "./include/constants.js";

test.describe( "Article", () => {

    test.beforeEach( async ( { articlePage: $ } ) => {
        await $.openPage();
    } );

    test( "shows title", async ( { articlePage: $ } ) => {
        await expect( $.titleLoc ).toBeVisible();
        await $.screenshot( "Article title", { el: $.titleLoc } );
    } );

    test( "mobile layout", async ( { articlePage: $ } ) => {
        await $.openPage( { viewport: VIEWPORTS.IPHONE8 } );
        await expect( $.bodyLoc ).toBeVisible();
    } );

} );
```

## package.json dependencies

| Package | Purpose |
|---|---|
| `@playwright/test` | Browser automation and test runner |
| `eslint` | Linting |
| `@babel/eslint-parser` | Babel-based parser for ESLint |
