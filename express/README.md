# Starter template for Node.js/ Express

The bundle contains a minimalistic REST server sample with asynchronous controller actions written in MVC style

## Available Automation Commands
- `npm start` - start server
- `npm run test` - run tests


## package.json

- `express` - [Express.js, web framework for Node.js](https://expressjs.com/)
- `body-parser` - [Node.js body parsing middleware](https://www.npmjs.com/package/body-parser)
- `minimist` - [parse argument options](https://www.npmjs.com/package/minimist)
- `debug` - [debugging utility](https://www.npmjs.com/package/debug)
- `cors` - [middleware to enable CORS with various options](https://www.npmjs.com/package/cors)

## Implemented methods

```
curl -X GET http://127.0.0.1:9002/news/101
```
Possible response: 200 - `{"content":"Content of new entry 101"}`


```
curl -X POST http://127.0.0.1:9002/news \
  -H 'content-type: multipart/form-data' \
  -F 'title=some title' \
  -F 'text=some body'
```

Possible response: 200 - `{"message":"News entry with id 69 added"}`

```
curl -X GET http://127.0.0.1:9002/news/invalid
```
Possible response: 500 - `{"message":"Required parameter is is missing or empty"}`