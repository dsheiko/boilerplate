# Starter template: Express.js REST API

Minimal REST API with MVC-style async controller actions, Jasmine tests, and auto-generated API docs.

## Prerequisites

- Node.js >= 8

## Stack

| Tool | Purpose |
|---|---|
| Express 4 | HTTP server and routing |
| body-parser | Request body parsing |
| cors | Cross-origin resource sharing |
| debug | Debug logging utility |
| Jasmine | Unit test framework |
| apidoc | API documentation from JSDoc annotations |

## Usage

```bash
npm install
npm start            # server starts on http://localhost:9002
npm test             # run Jasmine tests
npm run update:doc   # regenerate API.md from annotations
```

## Sample requests

```bash
# Get a news item
curl http://127.0.0.1:9002/news/101
# => {"content":"Content of new entry 101"}

# Create a news item
curl -X POST http://127.0.0.1:9002/news \
  -H 'content-type: multipart/form-data' \
  -F 'title=some title' \
  -F 'text=some body'
# => {"message":"News entry with id 69 added"}

# Invalid request (returns 400)
curl http://127.0.0.1:9002/news/invalid
# => {"message":"Required parameter is missing or empty"}
```

## Project structure

```
Controller/   route handler functions (async, MVC-style)
Router/       Express router setup
spec/         Jasmine test suites
index.js      entry point
API.md        generated API reference (run update:doc to refresh)
```

## API documentation

See [API.md](./API.md) for the generated reference. Regenerate it after changing JSDoc annotations with `npm run update:doc`.
