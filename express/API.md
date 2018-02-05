# boilerplate-express v0.0.1



- [NewsGroup](#newsgroup)
	- [Get news entry content](#get-news-entry-content)
	- [Add a news entry](#add-a-news-entry)
	


# NewsGroup

## Get news entry content



	GET /news/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>News entry id</p>							|

### Examples

Example usage:

```
curl -X GET http://127.0.0.1:9002/news/101
```

### Error Response

Response (example):

```
HTTP/1.1 400 Not Found
{
  "message": "Required parameter is is missing or empty"
}
```
## Add a news entry



	POST /news


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| string			|  							|
| body			| string			|  							|

### Examples

Example usage:

```
curl -X POST http://127.0.0.1:9002/news \
  -H 'content-type: multipart/form-data' \
  -F 'title=some title' \
  -F 'body=some body'
```

### Error Response

Response (example):

```
HTTP/1.1 400 Not Found
{
  "message": "Required parameters title and text are missing or empty"
}
```

