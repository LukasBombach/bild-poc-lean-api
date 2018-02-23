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
````

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
    },
    // ...
]
```

As long as your script runs, fetched articles will be cached.