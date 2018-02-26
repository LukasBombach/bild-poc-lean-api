const fetch = require('node-fetch');

const CONTENT_API_BASE_URL = 'http://content-server.editorial-dev.svc.bildops.de/contentapi/v1/document/';
const cache = {};

async function getArticle(articleId) {
  if (!articleId) {
    return {};
  }

  const articleKey = articleId.toString();

  if (cache[articleKey]) {
    return cache[articleKey];
  }

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
  if (!responseJson.cmsId) return { error: true, errorId: 1, message: 'Article not found' };
  const title = responseJson.headlinePlain;
  const teaser = getTeaserJson(responseJson);
  const body = responseJson.text.data.blocks
    .map(textBlock => `<p>${textBlock.text}</p>`)
    .join('');
  return { title, ...teaser, body };
}

function getTeaserJson(responseJson) {
  const teaser = responseJson.teasers.variants[0];
  const teaserText = teaser.data.blocks[0].text;
  const teaserImg = teaser.imageFragment ? teaser.imageFragment.image.binaryPath : '';
  return { teaserImg, teaserText }
}

module.exports = getArticle;