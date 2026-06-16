# Changelog

## [0.1.0] - 2026-06-11

### Changed
- Upgraded `puppeteer` from `^1.4.0` to `^24.43.1` (latest version supporting Node 18+)
- Upgraded `jest` from `^23.1.0` to `^29.7.0`

### Fixed
- `BrowserSession`: added `--no-sandbox` and `--disable-setuid-sandbox` launch flags for WSL/Docker/CI compatibility
- `BrowserSession`: added `--ignore-certificate-errors` flag to handle environments where Chromium rejects the system CA store
- `BrowserSession`: `browser.close()` is now awaited to prevent open handle warnings
- `rwd.spec.js`: replaced removed `puppeteer/DeviceDescriptors` import with `KnownDevices` from `puppeteer`
- `form.spec.js`: replaced removed `page.waitFor(ms)` with `new Promise(r => setTimeout(r, ms))`
- `form.spec.js`: `waitForSelector` now passes an explicit `timeout` so failures surface as errors rather than infinite hangs
- Both spec files: switched `waitUntil` from `"networkidle2"` to `"load"` to prevent hangs on pages with persistent connections (analytics, tracking, CDN fonts)
- Both spec files: `page.goto` now passes an explicit `timeout` via `NAVIGATION_TIMEOUT`
- `helpers.js`: `screenshots/` directory is created automatically via `mkdirSync` with `recursive: true`
- `constants.js`: added `NAVIGATION_TIMEOUT` (45s), increased `NETWORK_TIMEOUT` to 60s
- `constants.js`: added `SEL_FILE_INPUT` and `PATH_FIXTURES` for file upload tests
- `form.spec.js` Submission test: added `fileInput.uploadFile()` step for `input[type=file]`
- Added `fixtures/test.gif` (1x1 pixel GIF) as a minimal file upload fixture
