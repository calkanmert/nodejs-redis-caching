const redisClient = require('../redis');
const Article = require('../models/Article');

async function index(req, res) {
  await redisClient.connect();
  const cachedArticles = await redisClient.get('articles'); let
    articles;
  if (cachedArticles) {
    articles = JSON.parse(cachedArticles);
  } else {
    articles = await Article.find();
    await redisClient.set('articles', JSON.stringify(articles));
  }
  await redisClient.disconnect();
  res.render('index', { articles });
}

async function newArticle(req, res) {
  const createdArticle = await new Article({
    title: req.body.title,
    content: req.body.content,
  }).save();
  await redisClient.connect();
  await redisClient.set(`articles:${createdArticle._id}`, JSON.stringify(createdArticle));
  let cachedArticles = await redisClient.get('articles');
  if (!cachedArticles) {
    cachedArticles = JSON.parse(cachedArticles).push(createdArticle);
    await redisClient.set('articles', JSON.stringify(cachedArticles));
  } else {
    const getArticles = await Article.find();
    await redisClient.set('articles', JSON.stringify(getArticles));
  }
  redisClient.disconnect();
  res.redirect('back');
}

module.exports = {
  index,
  newArticle,
};
