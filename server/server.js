const express = require('express');
const getArticle = require('../src/get_article');
const getStage = require('../src/get_stage');
const { serverPort, stageArticleIds } = require('../src/config');

const app = express();

app.get('/stage', async (req, res) => {
  const stageJson = await getStage(stageArticleIds);
  res.send(stageJson);
});

app.get('/article/:articleId', async (req, res) => {
  const articleJson = await getArticle(req.params.articleId);
  res.send(articleJson);
});

app.listen(serverPort, () => {
  console.log('\nServer started on Port 3000');
  console.log('\nYour API:');
  console.log('\nFetch articles using http://127.0.0.1:3000/article/:articleId');
  console.log('Example: http://127.0.0.1:3000/article/5a8ff28dcf820a00015bf0d4');
  console.log('\nFetch the stage using http://127.0.0.1:3000/stage');
  console.log('Check out src/config.js to define which articles are included in the stage\n')
});
