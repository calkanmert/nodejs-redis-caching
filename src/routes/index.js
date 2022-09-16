const express = require('express');
const ArticleController = require('../controllers/Article');

const router = express.Router();

router.get('/', ArticleController.index);
router.post('/', ArticleController.newArticle);
router.get('/articles/:id', ArticleController.getArticle);

module.exports = router;
