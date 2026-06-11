# Starter template: E2E testing with Puppeteer + Jest

End-to-end browser tests using Jest and Puppeteer (headless Chrome). Shows how to launch a browser, navigate to a URL, interact with the DOM, and assert on rendered content.

## Prerequisites

- Node.js >= 10
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

## Writing tests

```js
const puppeteer = require("puppeteer");

describe("My app", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(process.env.URL);
  });

  afterAll(() => browser.close());

  it("renders the heading", async () => {
    const heading = await page.$eval("h1", el => el.textContent);
    expect(heading).toBe("Expected heading");
  });

  it("submits a form", async () => {
    await page.type("input[name=email]", "user@example.com");
    await page.click("button[type=submit]");
    await page.waitForSelector(".success");
  });
});
```

## package.json dependencies

| Package | Purpose |
|---|---|
| `jest` | Test runner and assertions |
| `puppeteer` | Headless Chrome API |
| `cross-env` | Set environment variables cross-platform |
| `express` | Build a local server to test against |
| `minimist` | Parse CLI arguments for custom server scripts |
