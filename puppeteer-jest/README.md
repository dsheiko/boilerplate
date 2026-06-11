# Starter template: E2E testing with Puppeteer + Jest

End-to-end browser tests using Jest and Puppeteer (headless Chrome). Shows how to launch a browser, navigate to a URL, interact with the DOM, and assert on rendered content.

## Prerequisites

- Node.js >= 18
- Puppeteer downloads Chromium automatically on `npm install`

## Stack

| Tool | Purpose |
|---|---|
| Jest | Test runner and assertion library |
| Puppeteer | Headless Chrome Node.js API |
| Express | Optional local server for your own app |

## Usage

```bash
npm install
npm test              # run tests against the configured URL
npm run test:debug    # run with browser visible (non-headless)
```

## Configuring the target URL

The test target URL is set via the `URL` environment variable in `package.json`:

```json
"test": "URL=https://example.com jest"
```

Change this to point at your own app. To test a local server, start it first and set `URL=http://localhost:3000`.

## WSL / Linux / CI notes

The `BrowserSession` launcher includes `--no-sandbox` and `--disable-setuid-sandbox` by default. These are required in environments where the kernel does not support Chrome's sandbox (WSL, Docker, most CI runners). `--ignore-certificate-errors` is also set so self-signed or corporate CA certificates do not block test runs.

## Writing tests

Selectors and timeouts are centralised in `shared/constants.js`. Use `BrowserSession` instead of calling `puppeteer.launch` directly — it handles launch flags and browser lifecycle.

```js
const bs = require("../shared/BrowserSession");
const { BASE_URL, NAVIGATION_TIMEOUT } = require("../shared/constants");

describe("My app", () => {
  beforeEach(async () => {
    await bs.setup();
    await bs.page.goto(BASE_URL, { waitUntil: "load", timeout: NAVIGATION_TIMEOUT });
  });

  afterEach(async () => {
    await bs.teardown();
  });

  it("renders the heading", async () => {
    const heading = await bs.page.$eval("h1", el => el.textContent);
    expect(heading).toBe("Expected heading");
  });

  it("submits a form", async () => {
    await bs.page.type("input[name=email]", "user@example.com");
    await bs.page.click("button[type=submit]");
    await bs.page.waitForSelector(".success", { timeout: NAVIGATION_TIMEOUT });
  });

  it("uploads a file", async () => {
    const input = await bs.page.$("input[type=file]");
    await input.uploadFile("/path/to/fixture.gif");
  });
});
```

### Waiting for page state

Prefer `waitForSelector` with an explicit `timeout` over `waitForTimeout` (removed in Puppeteer 22) or `page.waitFor` (removed in Puppeteer 14).

```js
// fixed delay (e.g. CSS transition)
await new Promise(r => setTimeout(r, 200));

// wait for DOM change
await bs.page.waitForSelector(".my-element", { timeout: NAVIGATION_TIMEOUT });
```

### Screenshots

Use the `png` helper from `shared/helpers.js`. The `screenshots/` directory is created automatically.

```js
const { png } = require("../shared/helpers");
await bs.page.screenshot(png("my-test-name"));
```

## package.json dependencies

| Package | Purpose |
|---|---|
| `jest` | Test runner and assertions |
| `puppeteer` | Headless Chrome API |
| `cross-env` | Set environment variables cross-platform |
| `express` | Build a local server to test against |
| `minimist` | Parse CLI arguments for custom server scripts |
