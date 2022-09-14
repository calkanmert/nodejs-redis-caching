const express = require('express');
const ArticleController = require('../controllers/Article');

const router = express.Router();

router.get('/', ArticleController.index);
router.post('/', ArticleController.newArticle);

module.exports = router;
