const fetch = require('node-fetch');

const CONTENT_API_BASE_URL = 'http://content-server.editorial-dev.svc.bildops.de/contentapi/v1/document/';
const cache = {};

async function getArticle(articleId) {
  if (!articleId) {
    return {};
  }

  const articleKey = articleId.toString();

  if (cache[articleKey]) {
    console.log(`Loading article ${articleKey} from cache`);
    return cache[articleKey];
  }

  console.log(`Fetching article ${articleKey} from API`);
  const articleJson = await loadArticle(articleId);
  cache[articleKey] = articleJson;
  return articleJson;
}

async function loadArticle(articleId) {
  const response = await fetch(`${CONTENT_API_BASE_URL}${articleId}`);
  const responseJson = await response.json();
  return getArticleJson(responseJson);
}

function getArticleJson(responseJson) {
  const title = responseJson.headlinePlain;
  const teaserImg = responseJson.teasers.variants[0].imageFragment.image.binaryPath;
  const teaserText = responseJson.teasers.variants[0].teaserText.data.blocks[0].text;
  const body = responseJson.text.data.blocks
    .map(textBlock => `<p>${textBlock.text}</p>`)
    .join('');
  return { title, teaserImg, teaserText, body };
}

module.exports = getArticle;