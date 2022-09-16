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

async function getArticle(req, res) {
  await redisClient.connect();
  const cachedArticle = await redisClient.get(`articles:${req.params.id}`); let
    article;
  if (cachedArticle) {
    article = JSON.parse(cachedArticle);
  } else {
    article = await Article.find({ _id: req.params.id });
    console.log(article);
    if (article.length < 1) {
      console.log('calisti');
      await redisClient.disconnect();
      return res.redirect('/');
    }
    await redisClient.set(`articles:${req.params.id}`, JSON.stringify(article));
  }
  redisClient.disconnect();
  return res.render('article', { article });
}

module.exports = {
  index,
  newArticle,
  getArticle,
};
