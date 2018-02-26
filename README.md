# POC Content API

## Installation

    npm install --save LukasBombach/bild-poc-lean-api
    yarn add LukasBombach/bild-poc-lean-api

## Usage

```js
const { getArticle, getStage } = require('data-api');
const article = await getArticle('5a8ff28dcf820a00015bf0d4');
const stage = await getStage(['5a8ff28dcf820a00015bf0d4', '5a901b631aed5700010be691']);
```

`getArticle` takes an article ID as an argument and returns the following data:

```json
{
    "title": "Title of the Article",
    "teaserImg": "Public URL to an image",
    "teaserText": "The body text without markup and cut off after some characters",
    "body": "The full body text including markup"
}
```

`getStage` takes an *an array of* article IDs as an argument and returns the article JSONs as an array:

```json
[
    {
        "title": "Title of the Article",
        "teaserImg": "Public URL to an image",
        "teaserText": "The body text without markup and cut off after some characters",
        "body": "The full body text including markup"
    },
    {
        "title": "Title of the Article",
        "teaserImg": "Public URL to an image",
        "teaserText": "The body text without markup and cut off after some characters",
        "body": "The full body text including markup"
    }
]
```

## Error(neous) responses

If you request and article ID that cannot be found, the following object will be returned:

```json
{ 
    "error": true, 
    "errorId": 1, 
    "message": "Article not found" 
}
```

Also, sometimes you will get an article that does not have a teaser yet, in that case, the fields `teaserImg` 
and `teaserText` will be omitted and you will get a response like this:

```json
{
    "title": "Title of the Article",
    "body": "The full body text including markup"
}
```

## Note

As long as your script runs, fetched articles will be cached.