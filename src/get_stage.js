const getArticle = require('./get_article');

async function getStage(articleIds) {
  const articlePromises = articleIds.map(articleId => getArticle(articleId));
  return await Promise.all(articlePromises);
}

module.exports = getStage;